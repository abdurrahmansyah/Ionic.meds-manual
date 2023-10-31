import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContentThreePageRoutingModule } from './search-content-three-routing.module';

import { SearchContentThreePage } from './search-content-three.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContentThreePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchContentThreePage]
})
export class SearchContentThreePageModule {}
