import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isPasswordHide = true;
  isValidUser = true;

  userDataForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private _router: Router, private _authService: AuthService) {}

  async onSubmit() {
    this.isValidUser = this._authService.login(
      this.userDataForm.value.userName as string,
      this.userDataForm.value.password as string
    );

    if (this.isValidUser) {
      this._router.navigateByUrl('');
    }
  }
}
