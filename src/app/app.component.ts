import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {AuthService} from "./service/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatToolbarRow, MatToolbar, RouterLinkActive, RouterLink, MatAnchor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT Shop';

  protected readonly authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
