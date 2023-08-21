import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermAndCondPage } from './term-and-cond.page';

const routes: Routes = [
  {
    path: '',
    component: TermAndCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermAndCondPageRoutingModule {}
