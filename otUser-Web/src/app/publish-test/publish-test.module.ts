import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { PublishTestRoutingModule } from './publish-test-routing.module';
import { AddPublishTestComponent } from './add-publish-test/add-publish-test.component';
import { ViewPublishTestComponent } from './view-publish-test/view-publish-test.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddPublishTestComponent, ViewPublishTestComponent],
  imports: [
    CommonModule,
    PublishTestRoutingModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class PublishTestModule { }
