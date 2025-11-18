// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RestaurantOwnerDashboardComponent } from './restaurant-owner-dashboard/restaurant-owner-dashboard.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'signup', component: SignupModalComponent },
  { path: 'login', component: LoginModalComponent },
  {path:'restaurant-owner-dashboard',component:RestaurantOwnerDashboardComponent},
 
];
