import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContentFivePage } from './search-content-five.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContentFivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContentFivePageRoutingModule {}
