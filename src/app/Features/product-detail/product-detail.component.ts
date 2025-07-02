import { Component, inject, OnInit } from '@angular/core';
import { ProductI } from '../../Interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { CountButtonComponent } from "../../Shared/count-button/count-button.component";
import { ButtonComponent } from "../../Shared/button/button.component";
import { ShoppingCartService } from '../../Services/shopping-cart.service';
import { CartModalComponent } from "../../Layouts/cart/cart-modal/cart-modal.component";
import { CartIconComponent } from "../../Layouts/cart/cart-icon/cart-icon.component";
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, CountButtonComponent, ButtonComponent, CartModalComponent, CartIconComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  count: number = 1;
  productId!: string;
  product?: ProductI;
  isCartModalOpen: boolean = false;
  displayMode: 'modal' | 'static' = 'modal';
  private breakpointObserver = inject(BreakpointObserver);
  private destroy$ = new Subject<void>();

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private shoppingCartService = inject(ShoppingCartService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.productId = String(param.get('id'));
      this.productService.getOneProduct(this.productId).subscribe(product => {
        if (Array.isArray(product) && product.length > 0) {
          this.product = product[0];
        }
      });
    });

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

  addToCart() {
    const product = this.product!;
    const count = this.count;
    this.shoppingCartService.addProduct({ product, count });
  }

}
