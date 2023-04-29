import { Routes } from '@angular/router';

import { NotFoundComponent } from './layout/components/not-found/not-found.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { disableAuthGuard } from './shared/guards/disable-auth.guard';
import { authGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './features/home/pages/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [disableAuthGuard],
  },
  // Not found page
  { path: '404', component: NotFoundComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];
