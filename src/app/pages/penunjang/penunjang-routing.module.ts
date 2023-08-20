import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenunjangPage } from './penunjang.page';

const routes: Routes = [
  {
    path: '',
    component: PenunjangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenunjangPageRoutingModule {}
