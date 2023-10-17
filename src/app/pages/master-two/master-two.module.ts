import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterTwoPageRoutingModule } from './master-two-routing.module';

import { MasterTwoPage } from './master-two.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterTwoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MasterTwoPage]
})
export class MasterTwoPageModule {}
