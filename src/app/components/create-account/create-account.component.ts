import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterServiceService } from '../../services/register-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  username = '';
  email = '';
  emailVisibility = true;
  password = '';
  passwordConfirm = '';
  phone = '';
  errorToast = ''; // <-- Para el mensaje de error

  constructor(
    private registerService: RegisterServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearCuenta() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

     if (!this.email || !this.username || !this.password || !this.passwordConfirm) {
      this.errorToast = 'Por favor, complete todos los campos.';
      setTimeout(() => this.errorToast = '', 4000);
      return;
    }
    if (this.password !== this.passwordConfirm) {
      this.errorToast = 'Las contraseñas no coinciden.';
      setTimeout(() => this.errorToast = '', 4000);
      return;
    }

    if (!passwordRegex.test(this.password)) {
    this.errorToast = 'La contraseña debe tener al menos una mayúscula, un número y un carácter especial.';
    setTimeout(() => this.errorToast = '', 4000);
    return;
  }
   

    const data = {
      username: this.username,
      email: this.email,
      emailVisibility: this.emailVisibility,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      phone: this.phone
    };

    this.registerService.register(data).subscribe({
      next: (res) => {
        this.registerService.requestEmailVerification(data.email).subscribe({
          next: () => {
            // Redirige o muestra toast de éxito si quieres
             this.router.navigate(['/login'], {
              replaceUrl: true,
              state: { registerDevice: true },
            });
          },
          error: (err) => {
            this.errorToast = 'No se pudo enviar el correo de verificación.';
            setTimeout(() => this.errorToast = '', 4000);
          }
        });
      },
      error: (err) => {
        this.errorToast = 'Error al registrar usuario.';
        setTimeout(() => this.errorToast = '', 4000);
      }
    });
  }
}
