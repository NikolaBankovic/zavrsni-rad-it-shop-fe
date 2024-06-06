import {Component, inject} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../dto/product.dto";
import {NgForOf, NgIf} from "@angular/common";
import {CartService} from "../../service/cart.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButton,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data as Product[];
    });
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
