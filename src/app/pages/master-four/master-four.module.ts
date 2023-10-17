import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterFourPageRoutingModule } from './master-four-routing.module';

import { MasterFourPage } from './master-four.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterFourPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MasterFourPage]
})
export class MasterFourPageModule {}
