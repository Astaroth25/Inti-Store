import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { FooterComponent } from './Layouts/footer/footer.component';
import { NavbarComponent } from './Layouts/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'IntiStore';
}
