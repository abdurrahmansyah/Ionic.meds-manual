import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObatPage } from './obat.page';

const routes: Routes = [
  {
    path: '',
    component: ObatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObatPageRoutingModule {}
