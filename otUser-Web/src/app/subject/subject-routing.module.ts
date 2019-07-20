import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subject',
    pathMatch: 'full',
},
{
  path: '',
  children: 
    [
      {
    path: 'addSubject',
   component:AddSubjectComponent
}],
canActivate:[AuthGuardService]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
