import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RadioimagingPage } from './radioimaging.page';

const routes: Routes = [
  {
    path: '',
    component: RadioimagingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadioimagingPageRoutingModule {}
