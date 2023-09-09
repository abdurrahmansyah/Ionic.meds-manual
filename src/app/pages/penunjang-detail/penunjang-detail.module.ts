import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenunjangDetailPageRoutingModule } from './penunjang-detail-routing.module';

import { PenunjangDetailPage } from './penunjang-detail.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenunjangDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PenunjangDetailPage]
})
export class PenunjangDetailPageModule {}
