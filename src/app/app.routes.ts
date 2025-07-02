import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/home.component';
import { ProductsComponent } from './Features/products/products.component';
import { ContactsComponent } from './Features/contacts/contacts.component';
import { LoginComponent } from './Features/login/login.component';
import { ProductDetailComponent } from './Features/product-detail/product-detail.component';
import { RegisterComponent } from './Features/register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent},
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
