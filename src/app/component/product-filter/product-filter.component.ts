import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CodebookService} from "../../service/codebook.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatLine, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatLine,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<any>();

  private readonly route = inject(ActivatedRoute);
  private readonly codebookService = inject(CodebookService);

  protected usedStates: string[] = [];
  protected category: string | null = null;

  protected productForm = new FormGroup({
    'name': new FormControl(),
    'priceFrom': new FormControl(),
    'priceTo': new FormControl(),
    'usedState': new FormControl(),
    'warrantyLength': new FormControl(),
    'manufacturerName': new FormControl(),
    'manufacturerCatalogueNumber': new FormControl()
  });

  constructor() {
    this.codebookService.getUsedStates().subscribe(data => this.usedStates = data);
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.queryParams['category'];
  }

  protected getProductType() {
    return this.category;
  }

  protected onSubmit() {
    const formData = this.productForm.value;
    this.filterApplied.emit(formData);
  }
}
