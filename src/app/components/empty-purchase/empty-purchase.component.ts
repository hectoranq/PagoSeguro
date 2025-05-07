import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-purchase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-purchase.component.html',
  styleUrls: ['./empty-purchase.component.scss']
})
export class EmptyPurchaseComponent {
  currentTime = '9:41';

  constructor(
      private router: Router
    ) {}
  doPurchase() {
    this.router.navigate(['/purchase-data'], {
      replaceUrl: true,
      state: { registerDevice: true },
    });
  }
}
