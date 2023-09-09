import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveiSekunderPage } from './survei-sekunder.page';

const routes: Routes = [
  {
    path: '',
    component: SurveiSekunderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveiSekunderPageRoutingModule {}
