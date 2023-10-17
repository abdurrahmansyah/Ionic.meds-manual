import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterPageRoutingModule } from './create-edit-master-routing.module';

import { CreateEditMasterPage } from './create-edit-master.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateEditMasterPage]
})
export class CreateEditMasterPageModule {}
