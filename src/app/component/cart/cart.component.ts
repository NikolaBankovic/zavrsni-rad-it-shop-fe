import {Component, inject} from '@angular/core';
import {Cart, CartItem, CartService} from '../../service/cart.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {OrderService} from "../../service/order.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmOrderComponent} from "../confirm-order/confirm-order.component";
import {AppNavigation} from "../../app.navigation";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    MatButton,
    MatIcon,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart | undefined;
  totalCost: number = 0;

  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly navigation = inject(AppNavigation);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadCart();
  }

  protected loadCart() {
    this.cartService.viewCart().subscribe(cart => {
      this.cart = cart;
      this.calculateTotalCost();
    });
  }

  protected removeItem(productId: number) {
    this.cartService.removeItem(productId).subscribe(cart => {
      this.cart = cart;
      this.calculateTotalCost();
    });
  }

  protected clearCart() {
    this.cartService.clearCart().subscribe(cart => {
      this.cart = cart;
      this.totalCost = 0;
    });
  }

  protected createOrder() {
    const dialogRef = this.dialog.open(ConfirmOrderComponent, {});
    dialogRef.afterClosed().subscribe(completeOrder => {
      if (completeOrder) {
        const creditCardNumber = completeOrder.creditCardNumber.slice(-4);
        this.orderService.createOrder(creditCardNumber).subscribe((data: any) => {
          this.navigation.navigateToOrderDetails(data.id);
        });
      }
    });
  }

  incrementQuantity(item: CartItem) {
    this.cartService.addItem(item.product.id, 1).subscribe(cart => {
      this.cart = cart;
      this.calculateTotalCost()
    });
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.addItem(item.product.id, -1).subscribe(cart => {
        this.cart = cart;
        this.calculateTotalCost()
      });
    }
  }

  protected calculateTotalCost() {
    if (this.cart) {
      this.totalCost = this.cart.cartItemList.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
  }

  protected getImageSrc(base64String: string): string {
    return `data:image/png;base64,${base64String}`;
  }
}
