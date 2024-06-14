import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppNavigation} from "../app.navigation";
import {User} from "../dto/user.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment.dev";
import {map} from "rxjs";
import {Role} from "../enum/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly navigation = inject(AppNavigation);
  private readonly snackBar = inject(MatSnackBar);

  protected url = environment.apiUrl + '/auth';
  protected user: User | undefined = undefined;

  register(data: any) {
    return this.http.post<User>(this.url + '/register', data).subscribe(() => {
      this.snackBar.open("Successfully Registered!", "✔️", { duration: 3000, verticalPosition: 'top' });
      this.navigation.navigateToLogin();
    });
  }

  login(data: any) {
    return this.http.post(this.url + '/login', data).subscribe((response: any) => {
      localStorage.setItem('access_token', response.token);
      this.user = response.user;
      this.navigation.navigateToHome();
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.user = undefined;
    this.navigation.navigateToLogin();
  }

  getUserByToken() {
    return this.http.get<User>(this.url + '/current').pipe(map((user: User) => {
      this.user = user;
      return user;
    }));
  }

  isLoggedIn() {
    if (this.user !== undefined) {
      return true;
    }
    if (this.tokenExists()) {
      return this.getUserByToken().subscribe();
    } else {
      return false;
    }
  }

  isAdmin() {
    if (this.user !== undefined) {
      return this.user.role === Role.ROLE_ADMIN;
    }
    return false;
  }

  tokenExists() {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  getCurrentUser() {
    return this.user;
  }
}
