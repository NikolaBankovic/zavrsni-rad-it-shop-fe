import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppNavigation {

  private readonly router = inject(Router);

  public navigateToHome() {
    this.router.navigate(['/']);
  }

  public navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
