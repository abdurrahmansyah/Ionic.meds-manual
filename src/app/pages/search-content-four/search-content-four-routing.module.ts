import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContentFourPage } from './search-content-four.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContentFourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContentFourPageRoutingModule {}
