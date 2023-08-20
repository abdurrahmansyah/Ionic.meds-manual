import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsesmenPage } from './asesmen.page';

const routes: Routes = [
  {
    path: '',
    component: AsesmenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsesmenPageRoutingModule {}
