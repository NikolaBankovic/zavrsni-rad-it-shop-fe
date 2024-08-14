import {Component, inject} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
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
import {AppNavigation} from "../../app.navigation";
import {AuthService} from "../../service/auth.service";
import {MatPaginator} from "@angular/material/paginator";

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
    MatSidenavContainer,
    MatPaginator,
    DecimalPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly navigation = inject(AppNavigation);
  private readonly authService = inject(AuthService);
  private readonly productService = inject(ProductService);
  private readonly pcService = inject(PCService);
  private readonly pcPartService = inject(PcPartService);
  private readonly peripheralService = inject(PeripheralService);
  private readonly softwareService = inject(SoftwareService);
  private readonly cartService = inject(CartService);

  products: Product[] = [];
  isLoading: boolean = true;

  length = 0;
  pageIndex = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12, 24, 96];

  filterValue = {}

  ngOnInit() {
    this.loadItems(null, 0, this.pageSize);
  }

  handleFilter(filterData: any) {
    this.filterValue = filterData;
    this.loadItems(this.filterValue, 0, this.pageSize);
  }

  protected getImageSrc(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }

  protected addToCart(product: Product) {
    if (this.authService.isLoggedIn()) {
      this.cartService.addItem(product.id, 1).subscribe({
        next: (cart) => {
          console.log(`${product.name} added to cart`);
          console.log(cart);
        },
        error: (err) => {
          console.error('Error adding product to cart', err);
        }
      });
    } else {
      this.navigation.navigateToLogin();
    }
  }

  protected changePage(pageData: any) {
    this.pageSize = pageData.pageSize;
    this.loadItems(this.filterValue, pageData.pageIndex, pageData.pageSize);
  }

  protected loadItems(filterData: any, pageIndex: number, pageSize: number): void {
    const category = this.route.snapshot.queryParams['category'];
    const subCategory = this.route.snapshot.queryParams['subCategory'];

    if (category === 'PC') {
      this.pcService.getPCCount(subCategory, filterData).subscribe((data: any) => {
        this.length = data.count;
      });
      this.pcService.getPCs(subCategory, filterData, pageIndex, pageSize).subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading PCs', error);
        this.isLoading = false;
      });
    } else if (category === 'PC_PART') {
      this.pcPartService.getPCPartCount(subCategory, filterData).subscribe((data: any) => {
        this.length = data.count;
      });
      this.pcPartService.getPCParts(subCategory, filterData, pageIndex, pageSize).subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading PC parts', error);
        this.isLoading = false;
      });
    } else if (category === 'PERIPHERAL') {
      this.peripheralService.getPeripheralCount(subCategory, filterData).subscribe((data: any) => {
        this.length = data.count;
      });
      this.peripheralService.getPeripherals(subCategory, filterData, pageIndex, pageSize).subscribe(data => {
        this.products = data as Product[];
        this.isLoading = false;
      }, error => {
        console.error('Error loading peripherals', error);
        this.isLoading = false;
      });
    } else if (category === 'SOFTWARE') {
      this.softwareService.getSoftwareCount(subCategory, filterData).subscribe((data: any) => {
        this.length = data.count;
      });
      this.softwareService.getSoftware(subCategory, filterData, pageIndex, pageSize).subscribe(data => {
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
