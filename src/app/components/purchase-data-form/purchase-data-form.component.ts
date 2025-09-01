import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-purchase-data-form',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './purchase-data-form.component.html',
  styleUrls: ['./purchase-data-form.component.scss']
})
export class PurchaseDataFormComponent {

  siguiente() {
    alert('Formulario enviado');
  }
}
