import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicRoutingModule } from './topic-routing.module';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AddTopicComponent],
  imports: [
    CommonModule,
    TopicRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
 
  ],
  
})
export class TopicModule { }
