import { AsyncPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { MatDividerModule } from '@angular/material/divider';
import { SideBarService } from '../../services/side-bar.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule,
    TitleCasePipe,
    MatIconModule,
    NgClass,
    Header,
    MatDividerModule,
    AsyncPipe
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  private _sideBarService = inject(SideBarService);

  isOpen$ = this._sideBarService.isOpen$;

  routes = [{ path: '/dashboard', title: 'Dashboard', icon: 'home' }, { path: '/products', title: 'Products', icon: 'box' }];
}
