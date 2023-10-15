import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentThreePage } from './content-three.page';

const routes: Routes = [
  {
    path: '',
    component: ContentThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentThreePageRoutingModule {}
