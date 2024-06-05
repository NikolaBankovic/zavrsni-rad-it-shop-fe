import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class PcPartService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/pc-part';

  createPCPart(data: any) {
    return this.http.post(this.url, data);
  }
}