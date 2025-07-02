import { Component, inject, input, output } from '@angular/core';
import { ShoppingCartService } from '../../../Services/shopping-cart.service';
import { Observable } from 'rxjs';
import { CartItemI } from '../../../Interfaces/cartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-icon',
  imports: [CommonModule],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent {
  private cartService = inject(ShoppingCartService);

  cartItem$!: Observable<CartItemI[]>;
  hiddenIcon = input<boolean>(false);
  openCart = output<void>();

  constructor() {
    this.cartItem$ = this.cartService.cartItem$;
  }
}
