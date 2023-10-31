import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContentFourPageRoutingModule } from './search-content-four-routing.module';

import { SearchContentFourPage } from './search-content-four.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContentFourPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchContentFourPage]
})
export class SearchContentFourPageModule {}
