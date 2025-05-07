import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { PasswordComponent } from './components/password/password.component';
import { OtpComponent } from './components/otp/otp.component';
import { HomeComponent } from './components/home/home.component';
import { EmptyPurchaseComponent } from './components/empty-purchase/empty-purchase.component';
import { PurchaseDataComponent } from './components/purchase-data/purchase-data.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'change-password', component: PasswordComponent },
    { path: 'otp', component: OtpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home-empty', component: EmptyPurchaseComponent },
    { path: 'purchase-data', component: PurchaseDataComponent },
    
  ];
