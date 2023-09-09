import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TandaVitalPage } from './tanda-vital.page';

const routes: Routes = [
  {
    path: '',
    component: TandaVitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TandaVitalPageRoutingModule {}
