import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private http: HttpClient) {}
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if ([401].includes(error.status)) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const refreshToken: string = this.authService.getRefreshToken;

            if (!refreshToken) {
              return throwError(error);
            }

            return this.http
              .post<any>(`${environment.API_URL}/identity/refresh-token`, {
                refreshToken: refreshToken,
              })
              .pipe(
                switchMap((response: any) => {
                  this.isRefreshing = false;
                  this.refreshTokenSubject.next(response.access);

                  this.authService.setToken(response.token);
                  this.authService.setRefreshToken(response.refreshToken);

                  return next.handle(this.addToken(request, response.token));
                }),
                catchError((e) => {
                  // if ([401].includes(e.status)) {
                    this.authService.logout();
                    return throwError(error);
                  // }
                })
              );
          }
        }
        const err =
          (error && error.error && error.error.message) || error.statusText;
        console.error(err);
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
