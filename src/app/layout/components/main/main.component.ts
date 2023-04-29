import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';

import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { Language } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    NavbarComponent,
  ],
})
export class MainComponent {
  isAuthenticated$ = this._authService.isAuthenticated$;
  Language = Language;

  constructor(
    public localeService: LocaleService,
    private _authService: AuthService
  ) {}

  logout() {
    this._authService.logout();
  }
}
