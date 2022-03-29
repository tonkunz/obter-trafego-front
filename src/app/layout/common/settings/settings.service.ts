import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  opened$: Observable<boolean>;
  private _opened: boolean = false;
  private _openedSubject: BehaviorSubject<boolean>;

  constructor() {
    this._openedSubject = new BehaviorSubject(this._opened);
    this.opened$ = this._openedSubject.asObservable();
  }

  openSettingsDrawer(): void {
    this._opened = true;
    this._openedSubject.next(true);
  }

  closeSettingsDrawer(): void {
    this._opened = false;
    this._openedSubject.next(false);
  }

  toggleSettingsDrawer(): void {
    this._opened = !this._opened;
    this._openedSubject.next(this._opened);
  }
}
