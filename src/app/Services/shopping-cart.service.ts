import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItemI } from '../Interfaces/cartItem';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly STORAGE = 'shoppingCart';
  private cartProducts: CartItemI[] = this.loadCart();

  private _carItem: BehaviorSubject<CartItemI[]> = new BehaviorSubject<CartItemI[]>(this.cartProducts);
  public cartItem$ = this._carItem.asObservable();

  addProduct(product: CartItemI): void {
    this.cartProducts.push(product);
    this.saveCart();
    this._carItem.next(this.cartProducts);
  }

  deleteProduct(index: number): void {
    this.cartProducts.splice(index, 1);
    this.saveCart();
    this._carItem.next(this.cartProducts);
  }

  clearCart(): void {
    this.cartProducts = [];
    this.saveCart();
    this._carItem.next(this.cartProducts)
  }

  private saveCart(): void {
    try {
      localStorage.setItem(this.STORAGE, JSON.stringify(this.cartProducts));
    } catch (e) {
      console.log('Algo salió mal al guardar tu carrito: ', e);
    }
  }

  private loadCart(): CartItemI[] {
    try {
      const storedCart = localStorage.getItem(this.STORAGE);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Error al cargar tu carrito');
      return [];
    }
  }
}
