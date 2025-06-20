import { Component, inject } from '@angular/core';
import { BannerComponent } from "../../Shared/banner/banner.component";
import { ProductItemComponent } from "../../Shared/product-item/product-item.component";
import { ProductService } from '../../Services/product.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductI } from '../../Interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [BannerComponent, ProductItemComponent,RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  private productService = inject(ProductService);
  public products$!: Observable<ProductI[]>;
  
    constructor(){
      this.productService.products$.subscribe();
      this.products$ = this.productService.products$;
    }

}
