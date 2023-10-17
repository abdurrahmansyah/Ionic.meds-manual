import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditMasterFourPage } from './create-edit-master-four.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditMasterFourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditMasterFourPageRoutingModule {}
