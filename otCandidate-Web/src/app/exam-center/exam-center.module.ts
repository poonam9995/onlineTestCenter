import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamCenterRoutingModule } from './exam-center-routing.module';
import { StartExamComponent } from './start-exam/start-exam.component';
import { FinalResultComponent } from './final-result/final-result.component';
//import { CountdownModule } from 'ngx-countdown';
//import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [StartExamComponent, FinalResultComponent],
  imports: [
    CommonModule,
    ExamCenterRoutingModule,
   // CountdownModule,
    // ToastrModule.forRoot({
    //   timeOut: 10000,
    //   positionClass: 'toast-bottom-right',
    //   preventDuplicates: true,
    // }),    
  ]
})
export class ExamCenterModule { }
