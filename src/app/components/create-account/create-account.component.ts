import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarServiceService } from 'src/app/services/avatar-service.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule],
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
    name: 'Juan Pérez'
  };

  constructor(private avatarService: AvatarServiceService) {}

  

  ngOnInit(): void {}

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.avatarFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.avatarPreview = reader.result);
      reader.readAsDataURL(this.avatarFile);
    }
  }


  upload() {
    if (!this.currentUser?.id) return;

    this.uploading = true;
    this.uploadProgress = 0;

    const metadata = {
      title: `Avatar de ${this.currentUser.name}`,
      description: `Subido el ${new Date().toLocaleDateString()}`
    };

    if (!this.avatarFile) {
      this.uploading = false;
      console.error('No se ha seleccionado un archivo de avatar.');
      return;
    }

    this.avatarService.safeUploadAvatar(
      this.currentUser.id,
      this.avatarFile,
      metadata
    ).subscribe({
      next: (response) => {
        console.log('Avatar subido con éxito', response);
        this.uploadProgress = 100;
        this.uploading = false;
        // Aquí puedes actualizar la UI o redirigir
      },
      error: (err) => {
        console.error('Error al subir:', err);
        this.uploadProgress = 0;
        this.uploading = false;
        // Manejo de errores en la UI
      }
    });
  }
}
