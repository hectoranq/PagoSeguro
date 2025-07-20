import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterServiceService } from '../../services/register-service.service';
import { Router } from '@angular/router';
import { AvatarServiceService } from 'src/app/services/avatar-service.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  avatarPreview: string | ArrayBuffer | null = null;
  avatarFile: File | null = null;
  @ViewChild('fileInput') fileInput!: any;
  uploadProgress = 0;
  uploading = false;
  currentUser = {
    id: '793ioaot67q7no6', // Este es el ID de relación en PocketBase
    name: 'Juan Pérez',
  };

  username = '';
  email = '';
  emailVisibility = true;
  password = '';
  passwordConfirm = '';
  phone = '';
  errorToast = ''; // <-- Para el mensaje de error

  constructor(
    private registerService: RegisterServiceService,
    private router: Router,
    private avatarService: AvatarServiceService
  ) {}

  ngOnInit(): void {}

  crearCuenta() {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

      if (!this.avatarFile) {
      this.errorToast = 'No se ha seleccionado un archivo de avatar.';
      setTimeout(() => (this.errorToast = ''), 4000);
      return;
    }
    if (
      !this.email ||
      !this.username ||
      !this.password ||
      !this.passwordConfirm
    ) {
      this.errorToast = 'Por favor, complete todos los campos.';
      setTimeout(() => (this.errorToast = ''), 4000);
      return;
    }

    
    if (this.password !== this.passwordConfirm) {
      this.errorToast = 'Las contraseñas no coinciden.';
      setTimeout(() => (this.errorToast = ''), 4000);
      return;
    }

    if (!passwordRegex.test(this.password)) {
      this.errorToast =
        'La contraseña debe tener al menos una mayúscula, un número y un carácter especial.';
      setTimeout(() => (this.errorToast = ''), 4000);
      return;
    }

    const data = {
      username: this.username,
      email: this.email,
      emailVisibility: this.emailVisibility,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      phone: this.phone,
    };

    this.registerService.register(data).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res);
        this.registerService.requestEmailVerification(data.email).subscribe({
          next: () => {
            this.upload(res.id); // Llamar a la función de carga del avatar
          },
          error: (err) => {
            this.errorToast = 'No se pudo enviar el correo de verificación.';
            setTimeout(() => (this.errorToast = ''), 4000);
          },
        });
      },
      error: (err) => {
        this.errorToast = 'Error al registrar usuario.';
        setTimeout(() => (this.errorToast = ''), 4000);
      },
    });
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.avatarFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.avatarPreview = reader.result);
      reader.readAsDataURL(this.avatarFile);
    }
  }

  upload(id: string) {
    if (!this.currentUser?.id) return;

    this.uploading = true;
    this.uploadProgress = 0;

    const metadata = {
      title: `Avatar de ${this.currentUser.name}`,
      description: `Subido el ${new Date().toLocaleDateString()}`,
    };

    if (!this.avatarFile) {
      this.uploading = false;
      console.error('No se ha seleccionado un archivo de avatar.');
      return;
    }

    this.avatarService
      .safeUploadAvatar(id, this.avatarFile, metadata)
      .subscribe({
        next: (response) => {
          console.log('Avatar subido con éxito', response);
          this.uploadProgress = 100;
          this.uploading = false;

          this.router.navigate(['/login'], {
            replaceUrl: true,
            state: { registerDevice: true },
          });
          // Aquí puedes actualizar la UI o redirigir
        },
        error: (err) => {
          console.error('Error al subir:', err);
          this.uploadProgress = 0;
          this.uploading = false;
          // Manejo de errores en la UI
        },
      });
  }
}
