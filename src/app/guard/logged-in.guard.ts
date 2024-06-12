import { CanActivateFn } from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppNavigation} from "../app.navigation";

export const loggedInGuard: CanActivateFn = (route, state) => {

  const navigation = inject(AppNavigation);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (authService.isLoggedIn()) {
    return true;
  }

  if (authService.tokenExists()) {
    return authService.getUserByToken().pipe(map(user => {
      return true;
    }));
  }

  snackBar.open("You need to be logged in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
  navigation.navigateToLogin();
  return false;
};
