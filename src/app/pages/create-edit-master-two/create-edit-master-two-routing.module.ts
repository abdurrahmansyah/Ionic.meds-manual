import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditMasterTwoPage } from './create-edit-master-two.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditMasterTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditMasterTwoPageRoutingModule {}
