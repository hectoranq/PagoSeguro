import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routes';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, ArrowLeft, Bell, Home, ShoppingCart, Package,
  ChevronLeft,
  Info,
  Upload } from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      LucideAngularModule.pick({ ArrowLeft, Bell, Home, ShoppingCart, Package, ChevronLeft, Info, Upload })
    )
  ]
})
  .catch((err) => console.error(err));
