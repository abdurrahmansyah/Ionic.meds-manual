import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContentSixPage } from './search-content-six.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContentSixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContentSixPageRoutingModule {}
