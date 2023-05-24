import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { UserResponse, User, Roles } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JsonPipe } from '@angular/common';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  private userToken = new BehaviorSubject<string>(null);

  // private user = new BehaviorSubject<UserResponse>(null);
  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  // get user$(): Observable<UserResponse> {
  //   return this.user.asObservable();
  // }

  // get userValue(): UserResponse {
  //   return this.user.getValue();
  // }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }

  get isVeterinario$(): Observable<string> {
    return this.role.asObservable();
  }

  get UserTokenValue(): string {
    return this.userToken.getValue();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          // this.user.next(user);
          this.loggedIn.next(true);
          this.role.next(user.role);
          this.userToken.next(user.token);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    //this.user.next(null);
    this.loggedIn.next(false);
    this.role.next(null);
    this.userToken.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        // this.user.next(user);
        this.loggedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
    console.log(user);
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'Se produjo un error al recuperar los datos';
    if (err) {
      errorMessage = `Error: código ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
