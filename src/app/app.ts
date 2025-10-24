import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from './ui/side-bar/side-bar';
import { RouterService } from './services/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBar, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private _routerService = inject(RouterService);

  isLoginPage = this._routerService.checkNeededPage$('/login');
}
