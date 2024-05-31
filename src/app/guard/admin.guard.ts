import {CanActivateFn} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../dto/user.dto";
import {Role} from "../enum/role";

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (authService.isLoggedIn()) {
    return authService.isAdmin();
  }

  if (authService.tokenExists()) {
    return authService.getUserByToken().pipe(map((user: User) => {
      if (user && user.role === Role.ROLE_ADMIN) {
        return true;
      }

      snackBar.open("You need to be admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
      return false;
    }));
  }

  snackBar.open("You need to be admin in to access this page!", "❌", { duration: 5000, verticalPosition: 'top'});
  return false;
};
