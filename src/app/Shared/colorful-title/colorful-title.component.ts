import { Component, input, OnInit } from '@angular/core';

interface ShopLetter {
  letter: string;
  color: string;
}

@Component({
  selector: 'app-colorful-title',
  imports: [],
  templateUrl: './colorful-title.component.html',
  styleUrl: './colorful-title.component.css'
})

export class ColorfulTitleComponent implements OnInit {
  shopName: string = 'Inti Store';
  colors: string[] = ['text-red-500', 'text-orange-500', 'text-amber-500', 'text-lime-500', 'text-emerald-500', 'text-cyan-500', 'text-indigo-500', 'text-violet-500', 'text-purple-500', 'text-pink-500', 'text-rose-500'];
  shopNameLetters: ShopLetter[] = [];
  classes = input<string>();

  private getColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  ngOnInit() {
    this.shopNameLetters = this.shopName.split('').map(letter => ({
      letter: letter,
      color: this.getColor()
    }));
  }
}
