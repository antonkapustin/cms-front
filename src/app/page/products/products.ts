import { Component, DestroyRef, effect, inject } from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { HeaderActionService } from '../../services/header-action.service';
import { HeaderEventType } from '../../interfaces/header-action.interface';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
import { TableData, TableCellType } from '../../interfaces/table.interface';
import { ProductNameComponent } from '../../ui/table/table-columns/product-name.component';
import { AsyncPipe } from '@angular/common';
import { EmptyPageComponent } from '../../ui/empry-page/empty-page';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewProductComponent } from '../../ui/dialog/new-product.component/new-product.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, AsyncPipe, EmptyPageComponent, MatDialogModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private readonly _headerActionService = inject(HeaderActionService);
  private _productService = inject(ProductService);
  private _dialogRef = inject(MatDialog);
  private _destroyRef = inject(DestroyRef);

  private readonly _reload$ = new BehaviorSubject<boolean>(false);

  productData: Observable<TableData<any>> = this._reload$.pipe(
    switchMap(() => this._loadTableData()),
    tap(console.log)
  );

  constructor() {
    effect(() => {
      const event = this._headerActionService.event();
      switch (event?.type) {
        case HeaderEventType.ADD_NEW:
          this.createProduct();
          break;
      }
    });
  }

  createProduct(): void {
    this._dialogRef
      .open(NewProductComponent)
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        switchMap((data) => this._productService.createProduct(data)),
        tap(() => this._reload$.next(true)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(console.log);
  }

  private _loadTableData(): Observable<TableData<any>> {
    return this._productService.getAllProducts().pipe(
      filter((data) => !!data.length),
      map((data) => {
        return {
          columns: [
            {
              header: 'product',
              component: ProductNameComponent,
              type: TableCellType.COMPONENT,
            },
            {
              header: 'category',
            },
            {
              header: 'price',
            },
          ],
          data: data.map((item: any) => ({
            product: { name: item.title, img: item.image },
            category: item.category,
            price: item.price,
          })),
        };
      })
    );
  }
}
