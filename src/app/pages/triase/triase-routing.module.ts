import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriasePage } from './triase.page';

const routes: Routes = [
  {
    path: '',
    component: TriasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriasePageRoutingModule {}
