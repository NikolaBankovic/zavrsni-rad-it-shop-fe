import { CanActivateFn } from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

export const notLoggedInGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (!authService.tokenExists()) {
    return true;
  }

  snackBar.open("You are already logged in!", "❌", { duration: 5000, verticalPosition: 'top'});
  return false;
};
