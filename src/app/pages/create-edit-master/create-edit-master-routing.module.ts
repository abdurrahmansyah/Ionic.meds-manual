import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditMasterPage } from './create-edit-master.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditMasterPageRoutingModule {}
