import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class PCService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/pc';

  getPCs(subCategory: string) {
    let params = new HttpParams();
    if(subCategory != undefined)
      params = params.append('pcType', subCategory);
    return this.http.get(this.url + '/all', {params : params});
  }

  createPC(data: any) {
    return this.http.post(this.url, data);
  }
}
