import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILocation } from './locations.types';

@Injectable({providedIn: 'root'})
export class LocationsService {
  private _locationsList$: BehaviorSubject<ILocation[]> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) {
    this.getLocations().subscribe((res: ILocation[]) => this.locationList = res);
  }

  getLocations(): Observable<ILocation[]> {
    return this._http.get<ILocation[]>(`${environment.api}/localizacoes`);
  }

  //
  get locationsList$(): Observable<ILocation[]> {
    return this._locationsList$.asObservable();
  }

  set locationList(value: ILocation[]) {
    this._locationsList$.next(value);
  }
}
