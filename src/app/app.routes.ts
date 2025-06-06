import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/home.component';
import { ProductsComponent } from './Features/products/products.component';
import { ContactsComponent } from './Features/contacts/contacts.component';
import { LoginComponent } from './Features/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
