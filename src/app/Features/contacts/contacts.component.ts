import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { ButtonComponent } from "../../Shared/button/button.component";

@Component({
  selector: 'app-contacts',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contactForm = new FormGroup({
  name: new FormControl(''),
  phone: new FormControl(''),
  email: new FormControl(''),
  message: new FormControl(''),
});

submit(){
  console.log(this.contactForm.value);
}
}
