import {Component, inject} from '@angular/core';
import {Product} from "../../dto/product.dto";
import {NgForOf, NgIf} from "@angular/common";
import {CartService} from "../../service/cart.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {TruncatePipe} from "../../pipe/truncate.pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PCService} from "../../service/pc.service";
import {PcPartService} from "../../service/pc-part.service";
import {PeripheralService} from "../../service/peripheral.service";
import {SoftwareService} from "../../service/software.service";
import {AuthService} from "../../service/auth.service";
import {AppNavigation} from "../../app.navigation";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButton,
    RouterLink,
    TruncatePipe,
    MatProgressSpinner
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private readonly navigation = inject(AppNavigation);
  private readonly authService = inject(AuthService);
  private readonly pcService = inject(PCService);
  private readonly pcPartService = inject(PcPartService)
  private readonly peripheralService = inject(PeripheralService)
  private readonly softwareService = inject(SoftwareService);
  private readonly cartService = inject(CartService);

  pcs: Product[] = [];
  pcParts: Product[] = [];
  peripherals: Product[] = [];
  software: Product[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.loadProducts();
  }

  protected loadProducts(): void {
    this.pcService.getTopPCs().subscribe(data => {
      this.pcs = data as Product[];
      this.isLoading = false;
    }, error => {
      console.error('Error loading PC', error);
      this.isLoading = false;
    })
    this.pcPartService.getTopPCParts().subscribe(data => {
      this.pcParts = data as Product[];
      this.isLoading = false;
    }, error => {
      console.error('Error loading PC parts', error);
      this.isLoading = false;
    })
    this.peripheralService.getTopPeripherals().subscribe(data => {
      this.peripherals = data as Product[];
      this.isLoading = false;
    }, error => {
      console.error('Error loading Peripherals', error);
      this.isLoading = false;
    })
    this.softwareService.getTopSoftware().subscribe(data => {
      this.software = data as Product[];
      this.isLoading = false;
    }, error => {
      console.error('Error loading Software', error);
      this.isLoading = false;
    })
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
}
