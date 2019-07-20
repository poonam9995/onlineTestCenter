import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { QuestionsRoutingModule } from './questions-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
@NgModule({
  declarations: [AddQuestionComponent, ViewQuestionsComponent, EditQuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    TagInputModule,
    TypeaheadModule.forRoot()
  ]
})
export class QuestionsModule { }
