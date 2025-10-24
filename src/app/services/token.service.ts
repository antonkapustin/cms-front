import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _accessToken = new BehaviorSubject<string>('')

  set accessToken(token: string) {
    this._accessToken.next(token);
  }

  get accessToken() {
    return this._accessToken.getValue();
  }
}
