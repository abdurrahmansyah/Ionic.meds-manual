import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterFivePage } from './master-five.page';

const routes: Routes = [
  {
    path: '',
    component: MasterFivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterFivePageRoutingModule {}
