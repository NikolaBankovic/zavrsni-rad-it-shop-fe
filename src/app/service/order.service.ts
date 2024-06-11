import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/order';

  getOrdersForCurrentUser() {
    return this.http.get(this.url);
  }

  getOrderById(id: number) {
    return this.http.get(this.url + `/${id}`);
  }

  createOrder() {
    return this.http.post(this.url, null);
  }
}
