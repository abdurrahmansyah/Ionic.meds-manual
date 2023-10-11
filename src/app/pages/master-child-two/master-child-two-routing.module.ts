import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterChildTwoPage } from './master-child-two.page';

const routes: Routes = [
  {
    path: '',
    component: MasterChildTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterChildTwoPageRoutingModule {}
