import { Component, inject, model} from '@angular/core';
import { ShoppingCartService } from '../../Services/shopping-cart.service';

@Component({
  selector: 'app-count-button',
  imports: [],
  templateUrl: './count-button.component.html',
  styleUrl: './count-button.component.css'
})
export class CountButtonComponent {
  count = model(1);

  add() {
    this.count.update(value => value + 1);
  }

  remove() {
    if(this.count() > 1)
    this.count.update(value => value - 1);
  }
}
