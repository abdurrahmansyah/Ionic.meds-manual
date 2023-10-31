import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContentTwoPage } from './search-content-two.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContentTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContentTwoPageRoutingModule {}
