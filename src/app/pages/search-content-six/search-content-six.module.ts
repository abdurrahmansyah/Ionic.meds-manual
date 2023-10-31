import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContentSixPageRoutingModule } from './search-content-six-routing.module';

import { SearchContentSixPage } from './search-content-six.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContentSixPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchContentSixPage]
})
export class SearchContentSixPageModule {}
