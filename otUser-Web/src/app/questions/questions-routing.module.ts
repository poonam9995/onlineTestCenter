import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'Questions',
  pathMatch: 'full',
},
{
  path: '',
  children:
    [{
      path: 'addQuestion',
      component: AddQuestionComponent,
    canActivate:[AuthGuardService]
    },
    {
      path: 'viewQuestion',
      component: ViewQuestionsComponent,
    canActivate:[AuthGuardService]
    },
    {
      path: 'editQuestion/:id',
      component: EditQuestionsComponent,     
      canActivate:[AuthGuardService]
    }

  ],
  canActivate:[AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
