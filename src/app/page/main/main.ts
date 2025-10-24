import { Component, effect, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { TableComponent } from '../../ui/table/table.component';
import { TableCellType, TableData } from '../../interfaces/table.interface';
import { ProductService } from '../../services/product.service';
import { filter, map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductNameComponent } from '../../ui/table/table-columns/product-name.component';
import { HeaderActionService } from '../../services/header-action.service';
import { HeaderEventType } from '../../interfaces/header-action.interface';
import { EmptyPageComponent } from '../../ui/empry-page/empty-page';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, TableComponent, AsyncPipe, EmptyPageComponent],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private _productService = inject(ProductService);
  private _headerActionService = inject(HeaderActionService);
  productData: Observable<TableData<any>> = this._productService
    .getAllProducts()
    .pipe(
      filter((data) => !!data.length),
      map((data) => {
        console.log(data);
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

  constructor() {
    effect(() => {
      const event = this._headerActionService.event();
      switch (event?.type) {
        case HeaderEventType.ADD_NEW:
          this._createNewItem();
          break;
      }
    });
  }

  private _createNewItem(): void {
    console.log('work')
  }
}
