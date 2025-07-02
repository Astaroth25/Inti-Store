import { Component, inject, input, output } from '@angular/core';
import { CartItemI } from '../../../Interfaces/cartItem';
import { ShoppingCartService } from '../../../Services/shopping-cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from "../cart-total/cart-total.component";
import { ButtonComponent } from "../../../Shared/button/button.component";

@Component({
  selector: 'app-cart-modal',
  imports: [CommonModule, CartTotalComponent, ButtonComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {
  displayMode = input<'modal' | 'static'>('modal');
  isOpen = input<boolean>(false);
  closeModal = output<void>();
  protected cartService = inject(ShoppingCartService);
  cartItem$!: Observable<CartItemI[]>;

  constructor() {
    this.cartItem$ = this.cartService.cartItem$;
  }

  // Métodos para eliminar elementos del carrito.
  deleteProduct(index: number) {
    this.cartService.deleteProduct(index);
  }

  clearCart() {
    this.cartService.clearCart();
    if (this.displayMode() === 'modal') {
      this.closeModal.emit();
    }

  }

  // Método para obtener el precio de los artículos.
  getPrice(item: CartItemI): number {
    const priceNumber = Number(item.product.price);
    const countNumber = Number(item.count);
    return priceNumber * countNumber;
  }

  getTotal(): number {
    let total: number = 0;
    this.cartItem$.subscribe(items => {
      for (let item of items) {
        total += this.getPrice(item);
      }
    }).unsubscribe();
    return total;
  }
}
