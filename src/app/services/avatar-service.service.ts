import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvatarServiceService {
  private readonly baseUrl = `${environment.authWithPassword}avatars/records`;

  constructor(private http: HttpClient) {}

  /**
   * Sube un nuevo avatar con relación de usuario obligatoria
   * @param userRecordId ID de registro de relación en PocketBase (RELATION_RECORD_ID)
   * @param files Archivos a subir
   * @param metadata Metadatos adicionales
   */
  uploadAvatarWithRelation(
    userRecordId: string,
    files: File[],
    metadata?: Omit<AvatarCreateData, 'userid'>
  ): Observable<any> {
    const formData = new FormData();

    // Campo de relación obligatorio
    formData.append('userid', userRecordId);

    // Metadatos adicionales
    if (metadata) {
      Object.keys(metadata).forEach((key) => {
        const value = metadata[key as keyof typeof metadata];
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
    }

    // Archivos (asumiendo que el campo se llama 'avatar' en PocketBase)
    files.forEach((file) => {
      formData.append('avatar', file, file.name);
    });

    return this.http.post(this.baseUrl, formData);
  }

  /**
   * Versión con validación mejorada
   */
  safeUploadAvatar(
    userId: string,
    file: File,
    metadata?: { title?: string; description?: string }
  ) {
    const formData = new FormData();
    formData.append('userid', userId);
    if (metadata?.title) formData.append('title', metadata.title);
    if (metadata?.description)
      formData.append('description', metadata.description);
    formData.append('foto_avatar', file); // El campo debe coincidir con el backend

    return this.http.post(this.baseUrl, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}

interface AvatarCreateData {
  userid: string; // RELATION_RECORD_ID obligatorio
  title?: string;
  description?: string;
  // otros campos opcionales
}
