import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContentPage } from './search-content.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContentPageRoutingModule {}
