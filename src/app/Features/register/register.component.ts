import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../Shared/button/button.component";
import { ColorfulTitleComponent } from "../../Shared/colorful-title/colorful-title.component";
import { UserService } from '../../Services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, ButtonComponent, ColorfulTitleComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router)

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    fname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    lname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username!;
      const fname = this.registerForm.value.fname!;
      const lname = this.registerForm.value.lname!;
      const email = this.registerForm.value.email!;
      const password = this.registerForm.value.password!;

      this.userService.register({ username, fname, lname, email, password }).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/login'])
        },
        error: (error) => console.error(error)
      });
    }
  }
}
