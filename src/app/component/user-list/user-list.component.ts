import {Component, inject} from '@angular/core';
import {User} from "../../dto/user.dto";
import {UserService} from "../../service/user.service";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgForOf, NgIf} from "@angular/common";
import {ProductFilterComponent} from "../product-filter/product-filter.component";
import {TruncatePipe} from "../../pipe/truncate.pipe";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatButton,
    MatPaginator,
    MatProgressSpinner,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    NgForOf,
    NgIf,
    ProductFilterComponent,
    TruncatePipe,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatFabButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);

  protected users: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'actions'];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }

  protected viewUser(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user: user
    };
    this.dialog.open(UserDetailsComponent, dialogConfig);
  }

  protected deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userService.deleteUser(id).subscribe(data => window.location.reload());
      }
    });

  }

}
