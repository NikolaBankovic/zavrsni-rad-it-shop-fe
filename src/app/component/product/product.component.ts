import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {Product} from "../../dto/product.dto";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  protected readonly authService = inject(AuthService);
  protected product = new Product();

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe(data => {
      this.product = data as Product;
    })
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
