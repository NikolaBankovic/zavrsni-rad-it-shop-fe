import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../service/auth.service";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {Role} from "../../enum/role";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatFormFieldModule,
    NgIf,
    MatOption,
    MatSelect,
    NgForOf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  protected isNewUser: boolean = true;
  protected selected: string = Role.ROLE_USER
  protected registerForm!: FormGroup;

  ngOnInit(): void {
    console.log(this.selected)
    if (this.router.url.startsWith('/edit')) {
      this.isNewUser = false;
      const id = this.route.snapshot.params['id'];
      this.userService.getUserById(id).subscribe(data => {
        this.registerForm.patchValue(data);
      })
    }

    if (this.router.url.startsWith('/create')) {
      this.isNewUser = false;
    }

    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.nullValidator),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, this.passwordValidator()),
      'phoneNumber': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'role': new FormControl(null, Validators.nullValidator)
    });
  }

  onSubmit() {
    if (!this.isNewUser) {
      if (this.router.url.startsWith('/edit')) {
        this.userService.updateUser(this.route.snapshot.params['id'], this.registerForm.value)
      }
      else if(this.router.url.startsWith('/create')) {
        this.userService.createUser(this.registerForm.value)
      }
    }
    else {
      this.authService.register(this.registerForm.value);
    }
  }

  private passwordValidator() {
    return this.isNewUser ? Validators.required : Validators.nullValidator;
  }

  protected readonly Role = Role;
  protected readonly Object = Object;
}
