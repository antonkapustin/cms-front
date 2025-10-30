import { Component, effect, inject } from '@angular/core';
import { TableCellType, TableData } from '../../interfaces/table.interface';
import { ProductService } from '../../services/product.service';
import { filter, map, Observable, tap } from 'rxjs';
import { ProductNameComponent } from '../../ui/table/table-columns/product-name.component';
import { HeaderActionService } from '../../services/header-action.service';
import { HeaderEventType } from '../../interfaces/header-action.interface';
import { EmptyPageComponent } from '../../ui/empry-page/empty-page';
import { MatDialog } from '@angular/material/dialog';
import { StoreComponent } from '../../ui/dialog/store.component/store.component';
import { Store } from '../../interfaces/store.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [EmptyPageComponent],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private _productService = inject(ProductService);
  private _headerActionService = inject(HeaderActionService);
  private _dialogRef = inject(MatDialog);

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

  openDialog(data?:Store ): void {
    this._dialogRef.open(StoreComponent, {data}).afterClosed().pipe(tap(console.log)).subscribe();
  }

  private _createNewItem(): void {
    console.log('work')
  }
}
