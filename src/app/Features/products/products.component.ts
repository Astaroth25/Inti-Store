import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../Shared/product-item/product-item.component';
import { ProductService } from '../../Services/product.service';
import { ProductI, ProductPaginationI } from '../../Interfaces/product';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartIconComponent } from "../../Layouts/cart/cart-icon/cart-icon.component";
import { CartModalComponent } from "../../Layouts/cart/cart-modal/cart-modal.component";
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent, CommonModule, RouterModule, CartIconComponent, CartModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories: string[] = ['Deportes', 'Electrónica', 'Hobby', 'Moda', 'Tecnología'];
  private productService = inject(ProductService);
  public products$!: Observable<ProductPaginationI>;
  isCartModalOpen: boolean = false;
  displayMode: 'modal' | 'static' = 'modal';

  category: string = '';

  private breakpointObserver = inject(BreakpointObserver);
  private destroy$ = new Subject<void>();

  constructor() {
    this.productService.products$.subscribe();
    this.products$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 768px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.matches) {
          this.displayMode = 'static';
          this.isCartModalOpen = false;
        } else {
          this.displayMode = 'modal';
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchByCategory(category: string, page: number): void {
    this.category = category;
    this.productService.getProducts({ category: category, page: page }).subscribe();
  }

  nextPage(page: number | null) {
    if (page !== null) {
      this.searchByCategory(this.category, page);
    }
  }

  previousPage(page: number | null) {
    if (page !== null) {
      this.searchByCategory(this.category, page);
    }
  }
}
