import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class PcPartService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/pc-part';

  getPCParts(subCategory: string) {
    let params = new HttpParams();
    if(subCategory != undefined)
      params = params.append('pcPartType', subCategory);
    return this.http.get(this.url + '/all', {params : params});
  }

  createPCPart(data: any) {
    return this.http.post(this.url, data);
  }
}
