import { Component, DestroyRef, effect, inject } from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { HeaderActionService } from '../../services/header-action.service';
import { HeaderEventType } from '../../interfaces/header-action.interface';
import { ProductService } from '../../services/product.service';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { TableData, TableCellType } from '../../interfaces/table.interface';
import { ProductNameComponent } from '../../ui/table/table-columns/product-name.component';
import { AsyncPipe } from '@angular/common';
import { EmptyPageComponent } from '../../ui/empry-page/empty-page';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewProductComponent } from '../../ui/dialog/new-product.component/new-product.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableActions } from '../../constant/table.conmstant';
import { Product } from '../../interfaces/product.interface';
import { CategoryComponent } from '../../ui/table/table-columns/category.component';
import { CategoryService } from '../../services/category.service';

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
  private readonly _categoryService = inject(CategoryService);
  private _dialogRef = inject(MatDialog);
  private _destroyRef = inject(DestroyRef);

  productData: Observable<TableData<any>> = this._productService
    .getAllProducts()
    .pipe(
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
              component: CategoryComponent,
              type: TableCellType.COMPONENT,
            },
            {
              header: 'price',
            },
            { header: 'actions', type: TableCellType.ACTIONS },
          ],
          data: data.map((item: any) => ({
            id: item.id,
            description: item.description,
            product: { name: item.title, img: item.image, code: item.code },
            category: { ...item.category, id: item.category.categoryId },
            price: item.price,
            actions: [TableActions.EDIT, TableActions.DELETE],
          })),
        };
      })
    );

  constructor() {
    effect(() => {
      const event = this._headerActionService.event();
      switch (event?.type) {
        case HeaderEventType.ADD_NEW:
          this.openDialog();
          break;
      }
    });
  }
  onActionClick(obj: { action: TableActions; item: Product }): void {
    switch (obj.action) {
      case TableActions.DELETE:
        this._onDeleteItem(obj.item);
        break;
      case TableActions.EDIT:
        this.openDialog(obj.item);
        break;
    }
  }

  openDialog(data?: Product): void {
    this._dialogRef
      .open(NewProductComponent, {
        data,
      })
      .afterClosed()
      .pipe(
        tap(() => this._headerActionService.close()),
        filter((data) => !!data),
        switchMap((data) =>
          data
            ? this._productService.updateProduct(data)
            : this._productService.createProduct(data)
        ),
        tap(() => this._productService.refetchAllProducts()),
        tap(() => this._categoryService.refreshAllCategories()),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  private _onDeleteItem(item: Product): void {
    this._productService
      .deleteProduct(item.id!)
      .pipe(
        tap(() => this._productService.refetchAllProducts()),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
