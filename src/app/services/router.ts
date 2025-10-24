import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private _router: Router){}

  checkNeededPage$(pageName: string): Observable<boolean> {
    return this._getNavigationEndEvent().pipe(
      map((event: NavigationEnd) => event.urlAfterRedirects === pageName)
    )
  }

  getCurrentPage$(): Observable<string> {
    return this._getNavigationEndEvent().pipe(
      map((event: NavigationEnd) => event.urlAfterRedirects.slice(1))
    )
  }

  navigateTo(pageName: string): void {
    this._router.navigate([pageName]);
  }

  private _getNavigationEndEvent(): Observable<NavigationEnd> {
    return this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
  }
}
