import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { FuseNavigationItem } from '@fuse/components/navigation';

// Navigation Data
import { menuNavigation } from './navigation-data';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _navigation: ReplaySubject<FuseNavigationItem[]> = new ReplaySubject<
    FuseNavigationItem[]
  >(1);

  constructor() {
    this._navigation.next(menuNavigation);
  }

  get navigation$(): Observable<FuseNavigationItem[]> {
    return this._navigation.asObservable();
  }
}
