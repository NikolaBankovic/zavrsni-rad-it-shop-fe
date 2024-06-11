import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Product} from "../../dto/product.dto";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PCService} from "../../service/pc.service";
import {PcPartService} from "../../service/pc-part.service";
import {PeripheralService} from "../../service/peripheral.service";
import {SoftwareService} from "../../service/software.service";
import {TruncatePipe} from "../../pipe/truncate.pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {ProductFilterComponent} from "../product-filter/product-filter.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButton,
    RouterLink,
    TruncatePipe,
    MatProgressSpinner,
    MatSidenavContent,
    ProductFilterComponent,
    MatSidenav,
    MatSidenavContainer
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly pcService = inject(PCService);
  private readonly pcPartService = inject(PcPartService);
  private readonly peripheralService = inject(PeripheralService);
  private readonly softwareService = inject(SoftwareService);
  private readonly cartService = inject(CartService);
  products: Product[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.loadItems(null)
  }

  handleFilter(event: any) {
    this.loadItems(event)
  }

  protected getImageSrc(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }

  protected addToCart(product: Product) {
    this.cartService.addItem(product.id, 1).subscribe({
      next: (cart) => {
        console.log(`${product.name} added to cart`);
        console.log(cart);
      },
      error: (err) => {
        console.error('Error adding product to cart', err);
      }
    });
  }

  protected loadItems(filterData: any): void {
    const category = this.route.snapshot.queryParams['category'];
    const subCategory = this.route.snapshot.queryParams['subCategory'];

    if (category === 'PC') {
      this.pcService.getPCs(subCategory, filterData).subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading PCs', error);
        this.isLoading = false;
      });
    } else if (category === 'PC_PART') {
      this.pcPartService.getPCParts(subCategory, filterData).subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading PC parts', error);
        this.isLoading = false;
      });
    } else if (category === 'PERIPHERAL') {
      this.peripheralService.getPeripherals(subCategory, filterData).subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading peripherals', error);
        this.isLoading = false;
      });
    } else if (category === 'SOFTWARE') {
      this.softwareService.getSoftware(subCategory, filterData).subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading software', error);
        this.isLoading = false;
      });
    } else {
      this.productService.getProducts().subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading products', error);
        this.isLoading = false;
      });
    }
  }
}
