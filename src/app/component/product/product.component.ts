import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {Product} from "../../dto/product.dto";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  ngOnInit() {

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
