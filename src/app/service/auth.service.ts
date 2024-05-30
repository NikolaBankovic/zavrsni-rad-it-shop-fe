import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppNavigation} from "../app.navigation";
import {User} from "../dto/user.dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly navigation = inject(AppNavigation);
  private readonly snackBar = inject(MatSnackBar);

  protected url = 'http://localhost:8080/api/auth';
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

  isLoggedIn() {
    return this.user !== undefined;
  }

  getCurrentUser() {
    return this.user;
  }
}
