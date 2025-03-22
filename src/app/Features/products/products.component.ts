import { Component } from '@angular/core';
import { ProductItemComponent } from "../../Shared/product-item/product-item.component";

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
