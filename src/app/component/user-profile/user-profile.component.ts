import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogContent} from "@angular/material/dialog";
import {AuthService} from "../../service/auth.service";
import {User} from "../../dto/user.dto";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {PCService} from "../../service/pc.service";
import {UserService} from "../../service/user.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatDialogContent,
    MatButton
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  private readonly dialog = inject(MatDialog);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  protected user: User = new User();

  constructor() {
    this.authService.getUserByToken().subscribe(user => {
      this.user = user;
    })
  }

  protected changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {});
    dialogRef.afterClosed().subscribe(changePasswordData => {
      if (changePasswordData) {
        const userId = this.authService.getCurrentUserId();
        this.userService.changePassword(userId, changePasswordData).subscribe(data => {
          window.location.reload();
        })
      }
    });
  }
}
