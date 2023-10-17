import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditMasterSixPage } from './create-edit-master-six.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditMasterSixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditMasterSixPageRoutingModule {}
