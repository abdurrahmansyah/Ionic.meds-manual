import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterThreePageRoutingModule } from './master-three-routing.module';

import { MasterThreePage } from './master-three.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterThreePageRoutingModule,
    ComponentsModule
  ],
  declarations: [MasterThreePage]
})
export class MasterThreePageModule {}
