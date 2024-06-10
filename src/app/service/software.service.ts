import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/software';

  getSoftware(subCategory: string, formData: any) {
    let params = new HttpParams();
    if(subCategory != undefined)
      params = params.append('softwareType', subCategory);
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

  getTopSoftware() {
    return this.http.get(this.url + '/top');
  }

  createSoftware(data: any) {
    return this.http.post(this.url, data);
  }
}
