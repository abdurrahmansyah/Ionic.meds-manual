import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanduanPage } from './panduan.page';

const routes: Routes = [
  {
    path: '',
    component: PanduanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanduanPageRoutingModule {}
