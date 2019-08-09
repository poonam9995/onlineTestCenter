import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [{
  path: '',
  redirectTo: 'topic',
  pathMatch: 'full',
},
{
path: '',
children: 
  [
    {
  path: 'addTopic',
 component:AddTopicComponent
}],
canActivate:[AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
