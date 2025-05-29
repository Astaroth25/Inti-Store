import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../Shared/product-item/product-item.component';
import { ProductService } from '../../Services/product.service';
import { ProductI } from '../../Interfaces/product-interface';
import { CategoryI } from '../../Interfaces/category';

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  productData: ProductI[] = [];
  categories: CategoryI[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.productData = data;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getProductsByCategory(category: string): void{
    this.productService.getProductsByCategory(category).subscribe({
      next: (data) => {
        this.productData = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
