import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-change-password',
  standalone: true,
  templateUrl: './change-password.component.html',
    imports: [
        MatDialogContent,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        NgIf,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatLabel,
        MatHint,
        MatError,
        MatButton
    ],
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.changePasswordForm = new FormGroup({
      'oldPassword': new FormControl(null, Validators.required),
      'newPassword': new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  changePassword() {
    this.dialogRef.close(this.changePasswordForm.value);
  }

}
