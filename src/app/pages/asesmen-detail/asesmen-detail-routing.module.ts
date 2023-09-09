import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsesmenDetailPage } from './asesmen-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AsesmenDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsesmenDetailPageRoutingModule {}
