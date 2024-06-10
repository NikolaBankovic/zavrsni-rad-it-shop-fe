import {Component, inject} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatButton,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);

  protected loginForm = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  });

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }

}
