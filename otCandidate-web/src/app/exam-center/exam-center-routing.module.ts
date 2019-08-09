import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalResultComponent } from './final-result/final-result.component'
import { StartExamComponent } from './start-exam/start-exam.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'exam',
    pathMatch: 'full',
  },
  {
    path: '',
    children:
      [
        {
          path: 'startExam/:id',
          component: StartExamComponent
        },
        {
          path: 'finalResult',
          component: FinalResultComponent
        },
      ],
    canActivate: [AuthGuardService]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamCenterRoutingModule { }
