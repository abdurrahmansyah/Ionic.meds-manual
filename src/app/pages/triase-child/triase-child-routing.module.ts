import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriaseChildPage } from './triase-child.page';

const routes: Routes = [
  {
    path: '',
    component: TriaseChildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriaseChildPageRoutingModule {}
