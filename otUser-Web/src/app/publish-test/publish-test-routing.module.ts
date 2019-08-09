import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPublishTestComponent } from './add-publish-test/add-publish-test.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewPublishTestComponent } from './view-publish-test/view-publish-test.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'PublishTest',
  pathMatch: 'full',
},
{
path: '',
children: 
  [
    {
  path: 'addPublishTest',
 component:AddPublishTestComponent
},
{
  path:'viewPublishTest',
  component:ViewPublishTestComponent
}
],
canActivate:[AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishTestRoutingModule { }
