import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserExistSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isUserExistSubject.asObservable();

  constructor(private _router: Router) {
    const user = localStorage.getItem('user');
    if (user) this._isUserExistSubject.next(true);
  }

  login(userName: string, password: string): boolean {
    if (
      (userName === 'admin' && password === 'admin') ||
      (userName === 'user' && password === 'user')
    ) {
      localStorage.setItem('user', userName);
      this._isUserExistSubject.next(true);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this._isUserExistSubject.next(false);
    this._router.navigateByUrl('login');
  }
}
