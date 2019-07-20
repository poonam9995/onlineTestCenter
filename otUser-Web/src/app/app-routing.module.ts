import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommanLayoutComponent } from './_shared/layout/comman-layout/comman-layout.component';
import { AuthLayoutComponent } from './_shared/layout/auth-layout/auth-layout.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
},
{
    path: '',
    component:CommanLayoutComponent,
    children: [
        {
            path: 'dashboard',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },
        {
            path: 'subject',
            loadChildren: './subject/subject.module#SubjectModule'
        },
        {
            path: 'topic',
            loadChildren: './topic/topic.module#TopicModule'
        },
        {
            path: 'Questions',
            loadChildren: './questions/questions.module#QuestionsModule'
        }
        ,{
            path :"TestTemplet",
            loadChildren:'./test-templet/test-templet.module#TestTempletModule'
        }
    ],
    canActivate:[AuthGuardService]
},
{
    path: '',
    component:AuthLayoutComponent,
    children: [
        {
            path: 'auth',
            loadChildren: './auth/auth.module#AuthModule'
        }
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
