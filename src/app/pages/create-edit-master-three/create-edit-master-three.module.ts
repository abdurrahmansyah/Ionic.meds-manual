import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterThreePageRoutingModule } from './create-edit-master-three-routing.module';

import { CreateEditMasterThreePage } from './create-edit-master-three.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterThreePageRoutingModule
  ],
  declarations: [CreateEditMasterThreePage]
})
export class CreateEditMasterThreePageModule {}
