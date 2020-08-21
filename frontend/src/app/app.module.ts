import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import {AppRoutes, appRouting} from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {headerComponent} from './header/header.component';
import {AuthInterceptor} from './auth/auth.interceptor';
import {ApiService} from './pages/users.service';
import {SidebarModule} from './sidebar/sidebar.module';
import {ErrorInterceptor} from './error-interceptor';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgSelectModule} from '@ng-select/ng-select';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';





@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    headerComponent,
    SignupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    appRouting,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    SidebarModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    NgSelectModule,
    SchedulerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}, ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
