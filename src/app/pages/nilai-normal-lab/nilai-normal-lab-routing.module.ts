import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NilaiNormalLabPage } from './nilai-normal-lab.page';

const routes: Routes = [
  {
    path: '',
    component: NilaiNormalLabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NilaiNormalLabPageRoutingModule {}
