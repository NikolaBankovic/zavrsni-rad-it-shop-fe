import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, throwError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (!(error.error instanceof ErrorEvent)) {
      snackBar.open(error.error, "❌", { duration: 5000, verticalPosition: 'top'});
      if (error.error.match("JWT")) {
        localStorage.removeItem("access_token");
      }
    }
    return throwError(() => error);
  }));
};
