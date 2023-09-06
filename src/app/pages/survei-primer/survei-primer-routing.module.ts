import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveiPrimerPage } from './survei-primer.page';

const routes: Routes = [
  {
    path: '',
    component: SurveiPrimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveiPrimerPageRoutingModule {}
