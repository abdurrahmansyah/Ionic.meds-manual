import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterSixPageRoutingModule } from './master-six-routing.module';

import { MasterSixPage } from './master-six.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterSixPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MasterSixPage]
})
export class MasterSixPageModule {}
