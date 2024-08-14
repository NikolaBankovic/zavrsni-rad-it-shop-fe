import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";
import {Observable} from "rxjs";
import {Category} from "../dto/category.dto";
import {SubCategory} from "../dto/type.dto";

@Injectable({
  providedIn: 'root'
})
export class CodebookService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/codebook';

  getProductTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/product-type');
  }

  getPCTypes(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.url + '/pc-type');
  }

  getPCPartTypes(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.url + '/pc-part-type');
  }

  getPeripheralTypes(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.url + '/peripheral-type');
  }

  getSoftwareTypes(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.url + '/software-type');
  }

  getUsedStates(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/used-state');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/category');
  }

  createPCType(data: any) {
    return this.http.post(this.url + '/pc-type', data);
  }

  createPCPartType(data: any) {
    return this.http.post(this.url + '/pc-part-type', data);
  }

  createPeripheralType(data: any) {
    return this.http.post(this.url + '/peripheral-type', data);
  }

  createSoftwareType(data: any) {
    return this.http.post(this.url + '/software-type', data);
  }
}
