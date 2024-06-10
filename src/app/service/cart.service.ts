import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Product} from "../dto/product.dto";
import {User} from "../dto/user.dto";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  user: User;
  cartItemList: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/cart';

  private cartItemCount = new BehaviorSubject<number>(0);

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  private updateCartItemCount(cart: Cart): void {
    this.cartItemCount.next(cart.cartItemList.reduce((count) => count + 1, 0));
  }

  viewCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl).pipe(
      map(cart => {
        this.updateCartItemCount(cart);
        return cart;
      })
    );
  }

  addItem(productId: number, quantity: number): Observable<Cart> {
    const params = new HttpParams()
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());
    return this.http.post<Cart>(`${this.apiUrl}/add`, null, { params }).pipe(
      map(cart => {
        this.updateCartItemCount(cart);
        return cart;
      })
    );
  }

  removeItem(productId: number): Observable<Cart> {
    const params = new HttpParams().set('productId', productId.toString());
    return this.http.post<Cart>(`${this.apiUrl}/remove`, null, { params }).pipe(
      map(cart => {
        this.updateCartItemCount(cart);
        return cart;
      })
    );
  }

  clearCart(): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/clear`, null).pipe(
      map(cart => {
        this.updateCartItemCount(cart);
        return cart;
      })
    );
  }
}
