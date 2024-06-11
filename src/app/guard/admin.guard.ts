import {CanActivateFn} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../dto/user.dto";
import {Role} from "../enum/role";
import {AppNavigation} from "../app.navigation";

export const adminGuard: CanActivateFn = (route, state) => {

  const navigation = inject(AppNavigation);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (authService.isLoggedIn()) {
    if (authService.isAdmin()) {
      return true
    } else {
      snackBar.open("You need to be admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
      navigation.navigateToHome();
      return false;
    }
  }

  if (authService.tokenExists()) {
    return authService.getUserByToken().pipe(map((user: User) => {
      console.log(user);
      if (user && user.role === Role.ROLE_ADMIN) {
        return true;
      }

      snackBar.open("You need to be admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
      navigation.navigateToHome();
      return false;
    }));
  }

  snackBar.open("You need to be admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
  navigation.navigateToHome();
  return false;
};
