import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterFourPage } from './master-four.page';

const routes: Routes = [
  {
    path: '',
    component: MasterFourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterFourPageRoutingModule {}
