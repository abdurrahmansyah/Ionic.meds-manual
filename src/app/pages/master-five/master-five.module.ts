import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterFivePageRoutingModule } from './master-five-routing.module';

import { MasterFivePage } from './master-five.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterFivePageRoutingModule,
    ComponentsModule
  ],
  declarations: [MasterFivePage]
})
export class MasterFivePageModule {}
