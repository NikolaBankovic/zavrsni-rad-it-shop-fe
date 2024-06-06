import {Component, OnInit, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {AuthService} from "./service/auth.service";
import {NgIf} from "@angular/common";
import {CartService} from "./service/cart.service";
import {CategoryNavComponent} from "./component/category-nav/category-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatToolbarRow, MatToolbar, RouterLinkActive, RouterLink, MatAnchor, NgIf, CategoryNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IT Shop';
  cartItemCount: number = 0;

  protected readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.viewCart().subscribe(cart => {
      this.cartItemCount = cart.cartItemList.length;
    });
  }

  logout() {
    this.authService.logout();
  }
}
