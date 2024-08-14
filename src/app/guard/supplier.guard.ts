import {CanActivateFn} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../dto/user.dto";
import {Role} from "../enum/role";
import {AppNavigation} from "../app.navigation";

export const supplierGuard: CanActivateFn = (route, state) => {

  const navigation = inject(AppNavigation);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (authService.isLoggedIn()) {
    if (authService.getCurrentUser() !== undefined) {
      if (authService.isSupplier() || authService.isAdmin()) {
        return true
      } else {
        snackBar.open("You need to be supplier or admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
        navigation.navigateToHome();
        return false;
      }
    }
  }

  if (authService.tokenExists()) {
    return authService.getUserByToken().pipe(map((user: User) => {
      if (user && (user.role === Role.ROLE_SUPPLIER || user.role === Role.ROLE_ADMIN)) {
        return true;
      }

      snackBar.open("You need to be supplier or admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
      navigation.navigateToHome();
      return false;
    }));
  }

  snackBar.open("You need to be supplier or admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
  navigation.navigateToHome();
  return false;
};
