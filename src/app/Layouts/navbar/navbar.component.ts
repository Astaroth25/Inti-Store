import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from "../../Shared/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { ProductI } from '../../Interfaces/product';
import { ProductService } from '../../Services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { UserLoginResponse } from '../../Interfaces/userLoginResponse';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  menuToggle: boolean = false;
  breakpointObserver = inject(BreakpointObserver);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router)
  currentUser$!: Observable<UserLoginResponse | null>;
  productData: ProductI[] = [];

  searchBar = new FormControl('');

  menuOpen$: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 640px)'])
    .pipe(map(state => state.matches));

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  menuClick() {
    this.menuOpen$.subscribe(isSm => {
      if (isSm) this.menuToggle = true;
      else { this.menuToggle = !this.menuToggle; }
    }).unsubscribe();
  }

  searchByName(): void {
    const searchTerm = this.searchBar.value!.trim();
    if (searchTerm) {
      this.productService.getProducts({ name: searchTerm }).subscribe();
      this.router.navigate(['/products']);
    };
    this.searchBar.reset();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log(response);
        console.log(this.currentUser$);
      },
      error: (error) => {
        console.error(error)
      }
    });
  }
}
