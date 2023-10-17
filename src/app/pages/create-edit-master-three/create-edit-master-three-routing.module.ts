import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditMasterThreePage } from './create-edit-master-three.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditMasterThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditMasterThreePageRoutingModule {}
