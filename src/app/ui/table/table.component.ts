import { TitleCasePipe } from '@angular/common';
import {
  Component,
  input,
  linkedSignal,
  output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { TableCellType, TableData } from '../../interfaces/table.interface';
import { CellHostDirective } from '../../directives/cell-host.directive';
import { TableActions } from '../../constant/table.conmstant';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TitleCasePipe, CellHostDirective, Menu, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  readonly tableTitle = input<string>();
  readonly tableData = input<TableData<any> | null>();

  readonly actionsEmitter = output<{action: TableActions, item: any}>();

  readonly headers = linkedSignal(() =>
    this.tableData()?.columns.map((item: any) => item.header)
  );

  readonly tableCellType = TableCellType;


  @ViewChildren(CellHostDirective) cellHosts!: QueryList<CellHostDirective>;

  onEmitAction(action: TableActions, item: any): void {
    this.actionsEmitter.emit({action, item});
  }

}
