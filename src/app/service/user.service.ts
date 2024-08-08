import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";
import {Observable} from "rxjs";
import {User} from "../dto/user.dto";
import {AppNavigation} from "../app.navigation";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);
  private readonly navigation = inject(AppNavigation);

  protected url = environment.apiUrl + '/account';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/all');
  }

  getUserById(id: number) {
    return this.http.get(this.url + `/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `/${id}`);
  }

  changePassword(id: number, changePasswordData: any) {
    return this.http.patch(this.url + `/${id}`, changePasswordData);
  }

  updateUser(id: number, userData: any) {
    return this.http.put(this.url + `/${id}`, userData).subscribe((response: any) => {
      this.navigation.navigateToHome();
    });
  }

  createUser(userData: any) {
    return this.http.post(this.url, userData).subscribe((response: any) => {
      this.navigation.navigateToUserList();
    });
  }
}
