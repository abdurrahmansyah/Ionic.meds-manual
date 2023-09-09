import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsesmenDetailPageRoutingModule } from './asesmen-detail-routing.module';

import { AsesmenDetailPage } from './asesmen-detail.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsesmenDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AsesmenDetailPage]
})
export class AsesmenDetailPageModule {}
