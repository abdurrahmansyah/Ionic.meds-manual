import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentFourPage } from './content-four.page';

const routes: Routes = [
  {
    path: '',
    component: ContentFourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentFourPageRoutingModule {}
