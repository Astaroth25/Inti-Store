import { Component, inject } from '@angular/core';
import { BannerComponent } from "../../Shared/banner/banner.component";
import { ProductItemComponent } from "../../Shared/product-item/product-item.component";
import { ProductService } from '../../Services/product.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductI } from '../../Interfaces/product';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from "../../Layouts/cart/cart-icon/cart-icon.component";
import { CartModalComponent } from "../../Layouts/cart/cart-modal/cart-modal.component";

@Component({
  selector: 'app-home',
  imports: [BannerComponent, ProductItemComponent, RouterModule, CommonModule, CartIconComponent, CartModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  private productService = inject(ProductService);
  public productsHighlight$!: Observable<ProductI[]>;

  isCartModalOpen: boolean = false;
  
    constructor(){
      this.productService.getHighlights().subscribe();
      this.productService.productsHighlight$.subscribe();
      this.productsHighlight$ = this.productService.productsHighlight$;
    }
}
