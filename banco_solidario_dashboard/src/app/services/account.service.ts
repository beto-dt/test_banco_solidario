import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  AUTH_SERVER: string = `${environment.API_URL}api/Accounts`;
  constructor(private httpClient: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/GetAccounts`);
  }

  getAccount(account: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/GetAccount`,account );
  }

  saveAccount(account: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/AddAccount`, account);
  }

  updateAccount(account: any): Observable<any> {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/UpdateAccount`,account);
  }


  deleteAccount(account: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/DeleteAccount`,account);
  }

}
