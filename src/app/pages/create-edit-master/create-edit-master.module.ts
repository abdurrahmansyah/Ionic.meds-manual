import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterPageRoutingModule } from './create-edit-master-routing.module';

import { CreateEditMasterPage } from './create-edit-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterPageRoutingModule
  ],
  declarations: [CreateEditMasterPage]
})
export class CreateEditMasterPageModule {}
