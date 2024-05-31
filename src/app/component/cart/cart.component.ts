import {Component, OnInit} from '@angular/core';
import {Cart, CartService} from '../../service/cart.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart | undefined;

  newProductId: number = 0;
  newQuantity: number = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.viewCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  addItem() {
    this.cartService.addItem(this.newProductId, this.newQuantity).subscribe(cart => {
      this.cart = cart;
      this.newProductId = 0;
      this.newQuantity = 1;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId).subscribe(cart => {
      this.cart = cart;
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(cart => {
      this.cart = cart;
    });
  }
}
