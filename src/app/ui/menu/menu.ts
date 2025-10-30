import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { TABLE_ACTIONS_ICONS, TableActions } from '../../constant/table.conmstant';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TitleCasePipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  readonly actions = input.required<TableActions[]>()
  readonly menuClick = output<TableActions>()

  actionsIcons: Record<string, string> = TABLE_ACTIONS_ICONS;

  onClickMenuBtn(action: TableActions):void {
    this.menuClick.emit(action);
  }
}
