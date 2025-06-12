import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../Shared/button/button.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { ProductI } from '../../Interfaces/product-interface';
import { ProductService } from '../../Services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuToggle: boolean = false;
  breakpointObserver = inject(BreakpointObserver);
  private productService = inject(ProductService);
  productData: ProductI[] = [];

  searchBar = new FormControl('');

  menuOpen$: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 640px)'])
    .pipe(map(state => state.matches));

  menuClick() {
    this.menuOpen$.subscribe(isSm => {
      if (isSm) this.menuToggle = true;
      else { this.menuToggle = !this.menuToggle; }
    }).unsubscribe();
  }

  search(): void {
    this.productService.getProductsByName(this.searchBar.value!).subscribe({
      next: data => {
        this.productData = data;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
