import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContentTwoPageRoutingModule } from './search-content-two-routing.module';

import { SearchContentTwoPage } from './search-content-two.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContentTwoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchContentTwoPage]
})
export class SearchContentTwoPageModule {}
