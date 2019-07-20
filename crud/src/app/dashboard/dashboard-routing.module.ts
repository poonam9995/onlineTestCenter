import { Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';

export const routes: Routes = [
  {
    path: 'default',
    component: DefaultComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

