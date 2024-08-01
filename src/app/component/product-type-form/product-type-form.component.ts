import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {CodebookService} from "../../service/codebook.service";
import {AuthService} from "../../service/auth.service";
import {AppNavigation} from "../../app.navigation";

@Component({
  selector: 'app-product-type-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    MatButton,
    NgIf
  ],
  templateUrl: './product-type-form.component.html',
  styleUrl: './product-type-form.component.css'
})
export class ProductTypeFormComponent {

  private readonly codebookService = inject(CodebookService);
  private readonly navigation = inject(AppNavigation);

  protected productTypes: string[] = [];

  protected productTypeForm = new FormGroup({
    'productType': new FormControl(null, Validators.required),
    'typeName': new FormControl(null, Validators.required),
  });

  constructor() {
    this.codebookService.getProductTypes().subscribe(data => this.productTypes = data);
  };

  protected getProductType() {
    return this.productTypeForm.controls.productType.value;
  }

  protected onSubmit() {
    const productType = this.getProductType();

    if (productType === "PC") {
      this.codebookService.createPCType(this.productTypeForm.value).subscribe(() => {
        this.navigation.navigateToHome();
      });
    } else if (productType === "PC_PART") {
      this.codebookService.createPCPartType(this.productTypeForm.value).subscribe(() => {
        this.navigation.navigateToHome();
      });
    } else if (productType === "PERIPHERAL") {
      this.codebookService.createPeripheralType(this.productTypeForm.value).subscribe(() => {
        this.navigation.navigateToHome();
      });
    } else if (productType === "SOFTWARE") {
      this.codebookService.createSoftwareType(this.productTypeForm.value).subscribe(() => {
        this.navigation.navigateToHome();
      });
    }
  }

  compare(o1: string, o2: string) {
    return o1 === o2;
  }
}
