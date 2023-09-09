import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditParentMasterPageRoutingModule } from './create-edit-parent-master-routing.module';

import { CreateEditParentMasterPage } from './create-edit-parent-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditParentMasterPageRoutingModule
  ],
  declarations: [CreateEditParentMasterPage]
})
export class CreateEditParentMasterPageModule {}
