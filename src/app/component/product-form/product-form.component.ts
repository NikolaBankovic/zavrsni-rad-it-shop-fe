import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatLine} from "@angular/material/core";
import {CodebookService} from "../../service/codebook.service";
import {NgForOf, NgIf} from "@angular/common";
import {PCService} from "../../service/pc.service";
import {PcPartService} from "../../service/pc-part.service";
import {PeripheralService} from "../../service/peripheral.service";
import {SoftwareService} from "../../service/software.service";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatLine,
    NgForOf,
    NgIf
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  private readonly codebookService = inject(CodebookService);
  private readonly pcService = inject(PCService);
  private readonly pcPartService = inject(PcPartService);
  private readonly peripheralService = inject(PeripheralService);
  private readonly softwareService = inject(SoftwareService);

  protected productTypes: string[] = [];
  protected pcTypes: string[] = [];
  protected pcPartTypes: string[] = [];
  protected peripheralTypes: string[] = [];
  protected softwareTypes: string[] = [];
  protected usedStates: string[] = [];

  protected productForm = new FormGroup({
    'productType': new FormControl(null, Validators.required),
    'name': new FormControl(null, Validators.required),
    'price': new FormControl(null, Validators.required),
    'description': new FormControl(null, Validators.required),
    'peripheralType': new FormControl(null, Validators.required),
    'softwareType': new FormControl(null, Validators.required),
    'pcType': new FormControl(null, Validators.required),
    'pcPartType': new FormControl(null, Validators.required),
    'usedState': new FormControl(null, Validators.required),
    'warrantyLength': new FormControl(null, Validators.required),
    'manufacturerName': new FormControl(null, Validators.required),
    'manufacturerCatalogueNumber': new FormControl(null, Validators.required),
    'partLink': new FormControl(null, Validators.required)
  });

  constructor() {
    this.codebookService.getProductTypes().subscribe(data => this.productTypes = data);
    this.codebookService.getPCTypes().subscribe(data => this.pcTypes = data);
    this.codebookService.getPCPartTypes().subscribe(data => this.pcPartTypes = data);
    this.codebookService.getPeripheralTypes().subscribe(data => this.peripheralTypes = data);
    this.codebookService.getSoftwareTypes().subscribe(data => this.softwareTypes = data);
    this.codebookService.getUsedStates().subscribe(data => this.usedStates = data);
  }

  protected getProductType() {
    return this.productForm.controls.productType.value;
  }

  protected onSubmit() {
    if (this.getProductType() == "PC") {
      this.pcService.createPC(this.productForm.value).subscribe(data => {
        console.log(data);
      });
    } else if (this.getProductType() == "PC_PART") {
      this.pcPartService.createPCPart(this.productForm.value).subscribe(data => {
        console.log(data);
      });
    } else if (this.getProductType() == "PERIPHERAL") {
      this.peripheralService.createPeripheral(this.productForm.value).subscribe(data => {
        console.log(data);
      });
    } else if (this.getProductType() == "SOFTWARE") {
      this.softwareService.createSoftware(this.productForm.value).subscribe(data => {
        console.log(data);
      });
    }
  }

  compare(o1: string, o2: string) {
    return o1 === o2;
  }

  protected isFormValid() {
    let partialValid;
    if (this.getProductType() === "PC") {
      partialValid = this.productForm.controls.pcType.valid;
    } else if (this.getProductType() === "PC_PART") {
      partialValid = this.productForm.controls.pcPartType.valid
        && this.productForm.controls.usedState.valid
        && this.productForm.controls.warrantyLength.valid
        && this.productForm.controls.manufacturerName.valid
        && this.productForm.controls.manufacturerName.valid
        && this.productForm.controls.partLink.valid;
    } else if (this.getProductType() === "PERIPHERAL") {
      partialValid = this.productForm.controls.peripheralType.valid;
    } else if (this.getProductType() === "SOFTWARE") {
      partialValid = this.productForm.controls.softwareType.valid;
    } else {
      partialValid = false;
    }

    return this.productForm.controls.name.valid && this.productForm.controls.price.valid && partialValid;
  }

}
