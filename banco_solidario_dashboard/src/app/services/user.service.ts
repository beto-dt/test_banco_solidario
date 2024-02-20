import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  AUTH_SERVER: string = `${environment.API_URL}api/Users`;
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/GetUsers`);
  }

  getUsersLastId(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/GetUsersLastId`);
  }

  getUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/GetUser`,user );
  }

  saveUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/AddUser`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/UpdateUser`,user);
  }


  deleteUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/DeleteUser`,user);
  }

}
