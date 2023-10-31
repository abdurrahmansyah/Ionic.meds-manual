import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContentThreePage } from './search-content-three.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContentThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContentThreePageRoutingModule {}
