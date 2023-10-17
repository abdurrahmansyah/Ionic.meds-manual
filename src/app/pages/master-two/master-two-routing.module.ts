import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterTwoPage } from './master-two.page';

const routes: Routes = [
  {
    path: '',
    component: MasterTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterTwoPageRoutingModule {}
