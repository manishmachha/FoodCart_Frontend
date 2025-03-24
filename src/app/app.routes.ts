import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./admin/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'admin/restaurants',
    loadComponent: () =>
      import('./admin/restaurants/restaurants.component').then(
        (m) => m.RestaurantsComponent
      ),
  },
];
