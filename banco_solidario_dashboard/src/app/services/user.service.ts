import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  AUTH_SERVER: string = `${environment.API_URL}api/users`;
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/all`);
  }

  getUser(id_usuario: any): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/user/${id_usuario}`);
  }

  saveUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/register`, user);
  }

  updateUser(user: any, id_usuario: any): Observable<any> {
    return this.httpClient.put<any>(
      `${this.AUTH_SERVER}/update/${id_usuario}`,
      user
    );
  }


  deleteUser(id_usuario: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.AUTH_SERVER}/delete/${id_usuario}`);
  }

}
