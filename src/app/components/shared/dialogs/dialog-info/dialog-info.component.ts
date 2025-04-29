import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {
  showInfoAlert(): void {
    Swal.fire({
      title: 'Información',
      text: 'Este es un mensaje informativo.',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }
}
