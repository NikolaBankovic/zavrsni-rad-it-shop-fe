import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { Observable } from 'rxjs';
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

  viewCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addItem(productId: number, quantity: number): Observable<Cart> {
    const params = new HttpParams()
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());
    return this.http.post<Cart>(`${this.apiUrl}/add`, null, { params });
  }

  removeItem(productId: number): Observable<Cart> {
    const params = new HttpParams().set('productId', productId.toString());
    return this.http.post<Cart>(`${this.apiUrl}/remove`, null, { params });
  }

  clearCart(): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/clear`, null);
  }
}
