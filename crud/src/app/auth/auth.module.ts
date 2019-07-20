import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from "./auth-routing.module";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
 
  ],
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent]
})
export class AuthModule { }
