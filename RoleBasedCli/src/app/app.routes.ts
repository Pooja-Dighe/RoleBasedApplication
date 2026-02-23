import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { Dashboard } from './Components/dashboard/dashboard';
import { roleGuard } from './Guards/role-guard';

export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
     { path:'login', component: Login },
     { path:'register', component: Register},

     {
  path:'dashboard',
  component: Dashboard,
  canActivate:[roleGuard]
}
];
