import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../Shared/product-item/product-item.component';
import { ProductService } from '../../Services/product.service';
import { ProductI } from '../../Interfaces/product-interface';

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  productData: ProductI[] = [] ;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.productData = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
