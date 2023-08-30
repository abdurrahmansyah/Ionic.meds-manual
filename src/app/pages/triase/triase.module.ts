import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriasePageRoutingModule } from './triase-routing.module';

import { TriasePage } from './triase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriasePageRoutingModule
  ],
  declarations: [TriasePage]
})
export class TriasePageModule {}
