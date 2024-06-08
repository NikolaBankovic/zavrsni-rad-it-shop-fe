import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";
import {Observable} from "rxjs";
import {Category} from "../dto/category.dto";

@Injectable({
  providedIn: 'root'
})
export class CodebookService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/codebook';

  getProductTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/product-type');
  }

  getPCTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/pc-type');
  }

  getPCPartTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/pc-part-type');
  }

  getPeripheralTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/peripheral-type');
  }

  getSoftwareTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/software-type');
  }

  getUsedStates(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/used-state');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/category');
  }
}
