import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterFivePageRoutingModule } from './create-edit-master-five-routing.module';

import { CreateEditMasterFivePage } from './create-edit-master-five.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterFivePageRoutingModule
  ],
  declarations: [CreateEditMasterFivePage]
})
export class CreateEditMasterFivePageModule {}
