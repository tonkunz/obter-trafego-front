import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

const authUrls = ['/autenticar', '/registrar'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Scape for unauthenticated routes
    if (this._verifyScapes(req.url)) {
      return next.handle(req);
    }

    // Clone the request object
    let newReq = req.clone();

    if (this._authService.accessToken) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this._authService.accessToken
        ),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          this._authService.signOut();

          // Reload the app
          location.reload();
        }

        return throwError(error);
      })
    );
  }

  _verifyScapes(reqUrl: string): boolean {
    let verify = false;

    authUrls.forEach((url: string) => {
      if (reqUrl.includes(url)) {
        verify = true;
      }
    });

    return verify;
  }
}
