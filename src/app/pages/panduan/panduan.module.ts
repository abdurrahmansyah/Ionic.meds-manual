import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanduanPageRoutingModule } from './panduan-routing.module';

import { PanduanPage } from './panduan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanduanPageRoutingModule
  ],
  declarations: [PanduanPage]
})
export class PanduanPageModule {}
