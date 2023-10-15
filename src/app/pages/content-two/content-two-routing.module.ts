import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentTwoPage } from './content-two.page';

const routes: Routes = [
  {
    path: '',
    component: ContentTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentTwoPageRoutingModule {}
