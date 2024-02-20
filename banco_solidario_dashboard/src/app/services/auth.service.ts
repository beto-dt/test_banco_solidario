import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  durationInSeconds = 3000;
  AUTH_SERVER: string = `${environment.API_URL}api/Users`;
  private loggedId = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient,private router:Router,private snackBar: MatSnackBar) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedId.asObservable();
  }

  login(authData: any): Observable<any> {
    return this.http.post<any>(`${this.AUTH_SERVER}/Login`, authData).pipe(
      map((res: any) => {
        console.log('RES',res);
        if (res.success === false) {
          this.snackBar.open("Correo o Contraseña Incorrecta","",{duration:this.durationInSeconds});
          return {
            status:false
          }
        }
        this.snackBar.open("Autentificación Exitosa","",{duration:this.durationInSeconds});

        this.saveToken(res.data.session_token);
        this.loggedId.next(true);
        return {
          status:true
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    this.loggedId.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('ACCESS_TOKEN');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired -> ', isExpired);
    isExpired ? this.logout() : this.loggedId.next(true);
  }

  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
  }
}
