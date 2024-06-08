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

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButton,
    RouterLink
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

  ngOnInit() {
    const category = this.route.snapshot.queryParams['category'];

    if (category === 'PC') {
      this.pcService.getPCs().subscribe(data => {
        this.products = data as Product[];
      })
    } else if (category === 'PC_PART') {
      this.pcPartService.getPCParts().subscribe(data => {
        this.products = data as Product[];
      })
    } else if (category === 'PERIPHERAL') {
      this.peripheralService.getPeripherals().subscribe(data => {
        this.products = data as Product[];
      })
    } else if (category === 'SOFTWARE') {
      this.softwareService.getSoftware().subscribe(data => {
        this.products = data as Product[];
      })
    } else {
      this.productService.getProducts().subscribe(data => {
        this.products = data as Product[];
      });
    }
  }

  getImageSrc(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }

  addToCart(product: Product) {
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
}
