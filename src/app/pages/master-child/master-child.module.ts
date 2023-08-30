import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterChildPageRoutingModule } from './master-child-routing.module';

import { MasterChildPage } from './master-child.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterChildPageRoutingModule
  ],
  declarations: [MasterChildPage]
})
export class MasterChildPageModule {}
