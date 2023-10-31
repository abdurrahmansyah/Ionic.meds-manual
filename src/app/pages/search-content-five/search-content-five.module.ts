import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContentFivePageRoutingModule } from './search-content-five-routing.module';

import { SearchContentFivePage } from './search-content-five.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContentFivePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchContentFivePage]
})
export class SearchContentFivePageModule {}
