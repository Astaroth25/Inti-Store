import { Injectable } from '@angular/core';
import { ProductI } from '../Interfaces/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private product: ProductI[] = [
    {
      id: 0,
      tittle: 'Vans Classics',
      price: 89.00,
      description: 'Zapatos de skate con plantilla conficush.',
      highlight: false,
      score: 0
    }
  ];

  getProducts(): ProductI[] {
    return this.product;
  }

  getOneProduct(productId: number): ProductI | string {
    let productFind = this.product.find((item) => item.id === productId);
    return productFind ? productFind: "No se encontró ningún elemento.";
  }
}
