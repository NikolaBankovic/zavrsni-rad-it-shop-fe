import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatHint,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent {

  private readonly dialogRef = inject(MatDialogRef<ConfirmOrderComponent>);

  protected completeOrderForm = new FormGroup({
    'creditCardName': new FormControl(null, Validators.required),
    'creditCardNumber': new FormControl(null, [Validators.required, Validators.pattern("[0-9]{16}")]),
    'expirationDate': new FormControl(null, [Validators.required, Validators.pattern("[0-9]{2}/[0-9]{4}")]),
    'CVC': new FormControl(null, [Validators.required, Validators.pattern("[0-9]{3}")])
  });
  protected confirm() {
    this.dialogRef.close(this.completeOrderForm.value);
  }
}
