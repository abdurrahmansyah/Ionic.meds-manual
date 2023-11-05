import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObatPageRoutingModule } from './obat-routing.module';

import { ObatPage } from './obat.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObatPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ObatPage]
})
export class ObatPageModule {}
