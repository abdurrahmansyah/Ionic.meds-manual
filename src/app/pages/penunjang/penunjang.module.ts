import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenunjangPageRoutingModule } from './penunjang-routing.module';

import { PenunjangPage } from './penunjang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenunjangPageRoutingModule
  ],
  declarations: [PenunjangPage]
})
export class PenunjangPageModule {}
