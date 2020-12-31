import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import UserRegister from '../models/UserRegister';
import User from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<boolean>(false);
  }

  public get isLoggedIn(): Observable<any> {
    if (this.getToken) {
      this.userSubject.next(true);
    } else {
      this.userSubject.next(false);
    }

    return this.userSubject.asObservable();
  }

  public get getToken(): string {
    return localStorage.getItem('token');
  }

  public get getRefreshToken(): string {
    return localStorage.getItem('refresh-token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.userSubject.next(true);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh-token', refreshToken);
    this.userSubject.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
  }

  public register(userRegister: UserRegister): any {
    return this.http
      .post<any>(`${environment.API_URL}/identity/register`, userRegister)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public login(user: User): any {
    return this.http
      .post<any>(`${environment.API_URL}/identity/login`, user)
      .pipe(
        map((response) => {
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);

          return response;
        })
      );
  }

  public logout(): void {
    console.log('401 hehehehehehheeh')
    this.removeTokens();
    this.userSubject.next(false);
    this.router.navigate(['/']);
  }
}
