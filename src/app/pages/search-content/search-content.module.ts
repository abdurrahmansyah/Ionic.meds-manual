import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContentPageRoutingModule } from './search-content-routing.module';

import { SearchContentPage } from './search-content.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchContentPage]
})
export class SearchContentPageModule {}
