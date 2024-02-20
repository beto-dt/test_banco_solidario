import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  AUTH_SERVER: string = `${environment.API_URL}api/Transactions`;
  constructor(private httpClient: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/GetTransactions`);
  }

  getTransaction(transaction: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/GetTransaction`,transaction );
  }

  getTransactionIdAccount(transaction: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/GetTransactionIdAccount`,transaction );
  }

  saveTransaction(transaction: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/AddTransaction`, transaction);
  }

  updateTransaction(transaction: any): Observable<any> {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/UpdateTransaction`,transaction);
  }


  deleteTransaction(transaction: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/DeleteTransaction`,transaction);
  }

}
