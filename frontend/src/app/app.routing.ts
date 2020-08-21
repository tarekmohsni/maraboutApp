import {RouterModule, Routes} from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';

import {AuthGuard} from './auth/auth.guard';
import {NgModule} from '@angular/core';



export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
// tslint:disable-next-line:class-name
export  class appRouting {
}
