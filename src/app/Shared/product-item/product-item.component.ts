import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductI } from '../../Interfaces/product';

@Component({
  selector: 'app-product-item',
  imports: [RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
}
