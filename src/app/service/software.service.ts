import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private readonly http = inject(HttpClient);

  protected url = environment.apiUrl + '/software';

  getSoftware() {
    return this.http.get(this.url + '/all');
  }

  createSoftware(data: any) {
    return this.http.post(this.url, data);
  }
}
