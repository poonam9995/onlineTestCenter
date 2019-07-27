import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTestTempletComponent } from './add-test-templet/add-test-templet.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { EditTestTempletComponent } from './edit-test-templet/edit-test-templet.component';
import { ViewTestTempletComponent } from './view-test-templet/view-test-templet.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'TestTemplet',
  pathMatch: 'full',
},
{
  path: '',
  children:
    [{
      path: 'addTestTemplet',
      component: AddTestTempletComponent,   
    },
    {
      path: 'viewTestTemplet',
      component: ViewTestTempletComponent,
        },
    {
      path: 'editTestTemplet/:id',
      component: EditTestTempletComponent,     
        }
  ],
  canActivate:[AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestTempletRoutingModule { }
