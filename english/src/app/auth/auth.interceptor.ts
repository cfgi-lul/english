import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {catchError, filter, finalize, switchMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!(request.url.includes('api/auth/login') || request.url.includes('api/auth/register'))) {
      return next.handle(this.addAuthToken(request)).pipe(
        catchError((requestError: HttpErrorResponse) => {
          if (requestError && requestError.status === 401) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject.pipe(
                filter((result) => !!result),
                take(1),
                switchMap(() => next.handle(this.addAuthToken(request)))
              );
            } else {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);

              return this.authService.refreshAuthToken().pipe(
                switchMap((token) => {
                  this.refreshTokenSubject.next(token.token);
                  return next.handle(this.addAuthToken(request));
                }),
                finalize(() => (this.refreshTokenInProgress = false))
              );
            }
          } else {
            return throwError(() => new Error(requestError.message));
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getToken();

    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer_${token}`,
      },
    });
  }
}
