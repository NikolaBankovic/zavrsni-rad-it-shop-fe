import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/product';

  getProducts() {
    return this.http.get(this.url + '/all');
  }
}
