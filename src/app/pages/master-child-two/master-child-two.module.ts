import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterChildTwoPageRoutingModule } from './master-child-two-routing.module';

import { MasterChildTwoPage } from './master-child-two.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterChildTwoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MasterChildTwoPage]
})
export class MasterChildTwoPageModule {}
