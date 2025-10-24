import { Component, inject } from '@angular/core';
import { Button } from '../button/button';
import { RouterService } from '../../services/router';
import { AsyncPipe } from '@angular/common';
import { SideBarService } from '../../services/side-bar.service';
import { HeaderActionService } from '../../services/header-action.service';
import { HeaderEventType } from '../../interfaces/header-action.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Button, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private _routerService = inject(RouterService);
  private _sideBarService = inject(SideBarService);
  private _headerActionService = inject(HeaderActionService);

  currentPage$ = this._routerService.getCurrentPage$();
  actionType = HeaderEventType;

  toggleSideBar(): void {
    this._sideBarService.toggle();
  }

  emitEvent(type: HeaderEventType, payload: any): void {
    this._headerActionService.emit({ type, payload });
  }
}
