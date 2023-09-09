import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditParentMasterPage } from './create-edit-parent-master.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditParentMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditParentMasterPageRoutingModule {}
