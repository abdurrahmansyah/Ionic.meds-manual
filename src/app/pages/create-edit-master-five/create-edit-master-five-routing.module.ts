import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditMasterFivePage } from './create-edit-master-five.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditMasterFivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditMasterFivePageRoutingModule {}
