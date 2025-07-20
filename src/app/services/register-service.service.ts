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
export class RegisterServiceService {
  
  private readonly registerEndpoint = `${environment.authWithPassword}/users/records`;// Ajusta la URL según tu backend
private readonly verificationEndpoint = `${environment.authWithPassword}/users/request-verification`;

  constructor(private http: HttpClient) {}

  register(data: {
    username: string;
    email: string;
    emailVisibility: boolean;
    password: string;
    passwordConfirm: string;
    phone: string;
  }): Observable<any> {
    return this.http.post<any>(this.registerEndpoint, data).pipe(
      catchError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'PROBLEMA AL REGISTRAR USUARIO',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return throwError(() => error);
      })
    );
  }

  requestEmailVerification(email: string): Observable<any> {
    return this.http.post<any>(this.verificationEndpoint, { email }).pipe(
      catchError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'NO SE PUDO ENVIAR EL CORREO DE VERIFICACIÓN',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
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
