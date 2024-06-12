import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class PeripheralService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/peripheral';

  getPeripherals(subCategory: string, formData: any) {
    let params = new HttpParams();
    if(subCategory != undefined)
      params = params.append('peripheralType', subCategory);
    if(formData != null) {
      if(formData.name != null){
        params = params.append('name', formData.name);
      }
      if(formData.priceFrom != null){
        params = params.append('priceFrom', formData.priceFrom);
      }
      if(formData.priceTo != null){
        params = params.append('priceTo', formData.priceTo);
      }
    }
    return this.http.get(this.url + '/all', {params : params});
  }

  getTopPeripherals() {
    return this.http.get(this.url + '/top');
  }

  createPeripheral(data: any) {
    return this.http.post(this.url, data);
  }

  editPeripheral(id:number, data: any) {
    return this.http.put(this.url + `/${id}`, data);
  }
}
