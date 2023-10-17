import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterFourPageRoutingModule } from './create-edit-master-four-routing.module';

import { CreateEditMasterFourPage } from './create-edit-master-four.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterFourPageRoutingModule
  ],
  declarations: [CreateEditMasterFourPage]
})
export class CreateEditMasterFourPageModule {}
