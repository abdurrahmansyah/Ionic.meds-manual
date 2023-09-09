import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TandaVitalPageRoutingModule } from './tanda-vital-routing.module';

import { TandaVitalPage } from './tanda-vital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TandaVitalPageRoutingModule
  ],
  declarations: [TandaVitalPage]
})
export class TandaVitalPageModule {}
