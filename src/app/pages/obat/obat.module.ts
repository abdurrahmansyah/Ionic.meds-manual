import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObatPageRoutingModule } from './obat-routing.module';

import { ObatPage } from './obat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObatPageRoutingModule
  ],
  declarations: [ObatPage]
})
export class ObatPageModule {}
