import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, throwError} from "rxjs";
import {AuthService} from "../service/auth.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (!(error instanceof ErrorEvent)) {
      snackBar.open(error.error, "❌", { duration: 5000, verticalPosition: 'top'});
      if (error.error.match("JWT")) {
        authService.clearCurrentUser();
        localStorage.removeItem("access_token");
      }
    }
    return throwError(() => error);
  }));
};
