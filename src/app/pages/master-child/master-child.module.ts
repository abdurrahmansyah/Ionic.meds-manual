import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterChildPageRoutingModule } from './master-child-routing.module';

import { MasterChildPage } from './master-child.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterChildPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MasterChildPage]
})
export class MasterChildPageModule {}
