import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/login/auth-request';
import { AuthResponse } from '../models/login/auth-response';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private readonly authEndpoint = `${environment.authWithPassword}/auth-with-password`;

  constructor(private http: HttpClient) {}

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authEndpoint, authRequest).pipe(
      catchError((error) => {
        //window.alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
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
