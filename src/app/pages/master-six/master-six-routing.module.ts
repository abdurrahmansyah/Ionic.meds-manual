import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterSixPage } from './master-six.page';

const routes: Routes = [
  {
    path: '',
    component: MasterSixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterSixPageRoutingModule {}
