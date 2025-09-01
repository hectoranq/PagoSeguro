import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Bell, Home, ShoppingCart, Package } from 'lucide-angular';
@Component({
  selector: 'app-empty-purchase',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
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
   comprar() {
    alert('Compra realizada!');
  }

  readonly ArrowLeft = ArrowLeft;
  readonly Bell = Bell;
  readonly Home = Home;
  readonly ShoppingCart = ShoppingCart;
  readonly Package = Package;
}
