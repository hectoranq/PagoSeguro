import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/login/auth-request';
import { AuthResponse } from '../models/login/auth-response';
import Swal from 'sweetalert2';
import { OAuthRequest } from '../models/login/oauth-request';
import { ResponseOAuth2 } from '../models/login/response-oauth2';
import { AuthRefreshRequest } from '../models/login/auth-refresh-request';
import { AuthRefreshResponse } from '../models/login/auth-refresh-response';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private readonly authEndpoint = `${environment.authWithPassword}/auth-with-password`;

  constructor(private http: HttpClient) {}

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authEndpoint, authRequest).pipe(
      catchError((error) => {
        this.showInfoAlert();
        return throwError(() => error);
      })
    );
  }

  authWithCauth2(authRequest: OAuthRequest): Observable<ResponseOAuth2> {
    return this.http.post<ResponseOAuth2>(this.authEndpoint, authRequest).pipe(
      catchError((error) => {
        this.showInfoAlert();
        return throwError(() => error);
      })
    );

  }

  authRefresk(autRefreshRequest: AuthRefreshRequest): Observable<AuthRefreshResponse> {
    return this.http.post<AuthRefreshResponse>(this.authEndpoint, autRefreshRequest).pipe(
      catchError((error) => {
        this.showInfoAlert();
        return throwError(() => error);
      })
    );

  }

  showInfoAlert(): void {
      Swal.fire({
        title: 'Error',
        text: 'PROBLEMA AL INICIAR SESIÓN, VERIFIQUE SU USUARIO Y CONTRASEÑA',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
}
