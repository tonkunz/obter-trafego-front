import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICreditItem } from './credits.types';

@Injectable({ providedIn: 'root' })
export class CreditsService {
  private _creditsList: ICreditItem[] = [];
  private _clientCredits = new BehaviorSubject<ICreditItem[]>(undefined);

  constructor(private _http: HttpClient) {
    console.log('construtor credits service...');
    if (!this._creditsList.length) {
      console.log('iniciando fetch de creditos');
      this.getCreditReport().subscribe((res: ICreditItem[]) =>
        this.setClientCredits(res)
      );
    }
  }

  getClientCredits(): Observable<ICreditItem[]> {
    return this._clientCredits.asObservable();
  }

  setClientCredits(newValues: ICreditItem[]) {
    this._creditsList = newValues;
    this._clientCredits.next(newValues);
  }

  getCreditReport(): Observable<ICreditItem[]> {
    return this._http.get<ICreditItem[]>(`${environment.api}/saldo-creditos`);
  }
}
