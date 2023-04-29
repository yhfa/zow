import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';

import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { Language } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  Language = Language;
  isAuthenticated$ = this._authService.isAuthenticated$;
  isMobile = window.innerWidth <= 480;
  @Input() sidenav!: MatSidenav;

  constructor(
    public localeService: LocaleService,
    private _authService: AuthService
  ) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this._authService.logout();
  }
}
