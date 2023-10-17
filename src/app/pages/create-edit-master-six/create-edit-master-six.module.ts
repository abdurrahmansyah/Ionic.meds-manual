import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterSixPageRoutingModule } from './create-edit-master-six-routing.module';

import { CreateEditMasterSixPage } from './create-edit-master-six.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterSixPageRoutingModule
  ],
  declarations: [CreateEditMasterSixPage]
})
export class CreateEditMasterSixPageModule {}
