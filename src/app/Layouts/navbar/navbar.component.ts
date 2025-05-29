import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../Shared/button/button.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuToggle: boolean = false;
  breakpointObserver = inject(BreakpointObserver);


  menuOpen$: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 640px)'])
    .pipe(map(state => state.matches));

  menuClick() {
    this.menuOpen$.subscribe(isSm => {
      if (isSm) this.menuToggle = true;
      else{this.menuToggle = !this.menuToggle;}  
    }).unsubscribe();
  }

}
