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
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {AppNavigation} from "../../app.navigation";
import {SubCategory} from "../../dto/type.dto";

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

  private readonly router = inject(Router);
  private readonly navigation = inject(AppNavigation)
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly codebookService = inject(CodebookService);
  private readonly pcService = inject(PCService);
  private readonly pcPartService = inject(PcPartService);
  private readonly peripheralService = inject(PeripheralService);
  private readonly softwareService = inject(SoftwareService);

  protected isNewProduct: boolean = true;
  protected productTypes: string[] = [];
  protected pcTypes: SubCategory[] = [];
  protected pcPartTypes: SubCategory[] = [];
  protected peripheralTypes: SubCategory[] = [];
  protected softwareTypes: SubCategory[] = [];
  protected usedStates: string[] = [];
  protected selectedFile: File | null = null;

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
    'linkToPartOnManufacturerWebsite': new FormControl(null, Validators.required)
  });

  constructor() {
    this.codebookService.getProductTypes().subscribe(data => this.productTypes = data);
    this.codebookService.getPCTypes().subscribe(data => this.pcTypes = data);
    this.codebookService.getPCPartTypes().subscribe(data => this.pcPartTypes = data);
    this.codebookService.getPeripheralTypes().subscribe(data => this.peripheralTypes = data);
    this.codebookService.getSoftwareTypes().subscribe(data => this.softwareTypes = data);
    this.codebookService.getUsedStates().subscribe(data => this.usedStates = data);
  }

  ngOnInit(): void {
    if (this.router.url.startsWith('/edit')) {
      this.isNewProduct = false;
      const id = this.route.snapshot.params['id'];
      this.productService.getProductById(id).subscribe(data => {
        this.productForm.patchValue(data);
      })
    }
  }

  protected getProductType() {
    return this.productForm.controls.productType.value;
  }

  protected onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  protected onSubmit() {
    const id = this.route.snapshot.params['id'];
    const formData = new FormData();
    const productType = this.getProductType();
    const dto = new Blob([JSON.stringify(this.productForm.value)], { type: 'application/json' });

    if (productType === "PC") {
      formData.append('pcDto', dto);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      if (this.isNewProduct) {
        this.pcService.createPC(formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        });
      } else {
        this.pcService.editPC(id, formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        })
      }
    } else if (productType === "PC_PART") {
      formData.append('pcPartDto', dto);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      if (this.isNewProduct) {
        this.pcPartService.createPCPart(formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        });
      } else {
        this.pcPartService.editPCPart(id, formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        })
      }
    } else if (productType === "PERIPHERAL") {
      formData.append('peripheralDto', dto);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      if (this.isNewProduct) {
        this.peripheralService.createPeripheral(formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        });
      } else {
        this.peripheralService.editPeripheral(id, formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        })
      }
    } else if (productType === "SOFTWARE") {
      formData.append('softwareDto', dto);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      if (this.isNewProduct) {
        this.softwareService.createSoftware(formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        });
      } else {
        this.softwareService.editSoftware(id, formData).subscribe((data: any) => {
          this.navigation.navigateToProduct(data.id);
        })
      }
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
        && this.productForm.controls.linkToPartOnManufacturerWebsite.valid;
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
