import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterChildPage } from './master-child.page';

const routes: Routes = [
  {
    path: '',
    component: MasterChildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterChildPageRoutingModule {}
