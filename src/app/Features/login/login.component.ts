import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../Shared/button/button.component';
import { UserService } from '../../Services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ColorfulTitleComponent } from "../../Shared/colorful-title/colorful-title.component";
import { AuthService } from '../../Services/auth.service';
import { UserLoginResponse } from '../../Interfaces/userLoginResponse';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent, RouterModule, ColorfulTitleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.authService.login({ username, password }).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error);
          // this.router.navigate(['/home']);
        }
      });
    }

  }
}


