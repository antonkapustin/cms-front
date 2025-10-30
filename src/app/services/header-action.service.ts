import { Injectable, signal } from '@angular/core';
import { HeaderAction } from '../interfaces/header-action.interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderActionService {
  private _eventSignal = signal<HeaderAction | null>(null);
  readonly event = this._eventSignal.asReadonly();

  emit(event: HeaderAction):void {
    this._eventSignal.set(event);
  }

  close(): void {
    this._eventSignal.set(null);
  }
}
