import { Component } from '@angular/core';
import { ButtonComponent } from "../../Shared/button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuOpen: boolean = true;

  menuClick() {
    this.menuOpen = !this.menuOpen;
  }
}
