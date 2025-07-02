import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cart-total',
  imports: [CommonModule],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.css'
})
export class CartTotalComponent {
  total = input<number>(0);
}
