import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenunjangDetailPage } from './penunjang-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PenunjangDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenunjangDetailPageRoutingModule {}
