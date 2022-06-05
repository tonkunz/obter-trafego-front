import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { User } from './user.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private _httpClient: HttpClient) {}

  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // get user info
  get(): Observable<User> {
    return this._httpClient.get<User>(`${environment.api}/user`).pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }
}
