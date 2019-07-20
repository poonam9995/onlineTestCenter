import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestTempletRoutingModule } from './test-templet-routing.module';
import { AddTestTempletComponent } from './add-test-templet/add-test-templet.component';
import { EditTestTempletComponent } from './edit-test-templet/edit-test-templet.component';

import { ViewTestTempletComponent } from './view-test-templet/view-test-templet.component';

@NgModule({
  declarations: [AddTestTempletComponent, EditTestTempletComponent, ViewTestTempletComponent],
  imports: [
    CommonModule,
    TestTempletRoutingModule
  ]
})
export class TestTempletModule { }
