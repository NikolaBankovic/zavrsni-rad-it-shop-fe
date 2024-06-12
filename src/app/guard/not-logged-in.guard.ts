import { CanActivateFn } from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppNavigation} from "../app.navigation";

export const notLoggedInGuard: CanActivateFn = (route, state) => {

  const navigation = inject(AppNavigation);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (!authService.tokenExists()) {
    return true;
  }

  snackBar.open("You are already logged in!", "❌", { duration: 5000, verticalPosition: 'top'});
  navigation.navigateToHome();
  return false;
};
