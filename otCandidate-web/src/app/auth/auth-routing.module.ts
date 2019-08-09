import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
},
{
  path: '',
  children: [
      {
          path: 'login',
          component: LoginComponent,
          data: {
              title: 'Login'
          }
      },
    
      {
          path: 'forgot-password',
          component:ForgetPasswordComponent,
          data: {
              title: 'Forgot password'
          }
      },   
      {
        path: 'resetPassword/:id',
        component:ResetPasswordComponent,
        data: {
            title: 'Forgot password'
        }
    },          
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
