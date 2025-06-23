import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../Shared/product-item/product-item.component';
import { ProductService } from '../../Services/product.service';
import { ProductI } from '../../Interfaces/product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  categories: string[] = ['Deportes', 'Electrónica', 'Hobby', 'Moda', 'Tecnología'];
  private productService = inject(ProductService);
  public products$!: Observable<ProductI[]>;

  constructor(){
    this.productService.getProducts().subscribe();
    this.productService.products$.subscribe();
    this.products$ = this.productService.products$;
  }

  searchByCategory(category: string): void {
    this.productService.getProducts({category: category}).subscribe();
  }
}
