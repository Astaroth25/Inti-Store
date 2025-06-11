import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../Shared/button/button.component';

interface ShopLetter {
  letter: string;
  color: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  shopName: string = 'Inti Store';
  colors: string[] = ['text-red-500', 'text-orange-500', 'text-amber-500', 'text-lime-500', 'text-emerald-500', 'text-cyan-500', 'text-indigo-500', 'text-violet-500', 'text-purple-500', 'text-fuchsia-500', 'text-pink-500', 'text-rose-500'];
  shopNameLetters: ShopLetter[] = [];

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

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


