import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentFivePage } from './content-five.page';

const routes: Routes = [
  {
    path: '',
    component: ContentFivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentFivePageRoutingModule {}
