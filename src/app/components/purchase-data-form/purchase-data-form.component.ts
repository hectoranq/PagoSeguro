import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-data-form',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './purchase-data-form.component.html',
  styleUrls: ['./purchase-data-form.component.scss']
})
export class PurchaseDataFormComponent {
  constructor(private router: Router) {}

  siguiente() {
    this.router.navigate(['/confirm-payment'], {
      replaceUrl: true,
      state: { registerDevice: true },
    });
  }
}
