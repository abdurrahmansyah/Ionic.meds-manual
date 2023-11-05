import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanduanPageRoutingModule } from './panduan-routing.module';

import { PanduanPage } from './panduan.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanduanPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PanduanPage]
})
export class PanduanPageModule {}
