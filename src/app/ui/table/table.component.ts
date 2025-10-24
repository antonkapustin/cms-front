import { TitleCasePipe } from '@angular/common';
import {
  Component,
  input,
  linkedSignal,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableCellType, TableData } from '../../interfaces/table.interface';
import { CellHostDirective } from '../../directives/cell-host.directive';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TitleCasePipe, CellHostDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  readonly tableTitle = input<string>();
  readonly tableData = input<TableData<any> | null>();

  readonly headers = linkedSignal(() =>
    this.tableData()?.columns.map((item: any) => item.header)
  );

  readonly tableCellType = TableCellType;

  @ViewChildren(CellHostDirective) cellHosts!: QueryList<CellHostDirective>;
}
