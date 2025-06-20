import { Component, inject, OnInit } from '@angular/core';
import { ProductI } from '../../Interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId!: string;
  product?: ProductI;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService)

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.productId = String(param.get('id'));
      this.productService.getOneProduct(this.productId).subscribe(product => {
        if (Array.isArray(product) && product.length > 0) {
          this.product = product[0];
        }
        console.log(this.product);
      });
    });
  }

}
