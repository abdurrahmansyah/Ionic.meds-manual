import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentSixPage } from './content-six.page';

const routes: Routes = [
  {
    path: '',
    component: ContentSixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentSixPageRoutingModule {}
