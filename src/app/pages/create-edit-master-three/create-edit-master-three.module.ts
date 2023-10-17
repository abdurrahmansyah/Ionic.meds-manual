import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterThreePageRoutingModule } from './create-edit-master-three-routing.module';

import { CreateEditMasterThreePage } from './create-edit-master-three.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterThreePageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateEditMasterThreePage]
})
export class CreateEditMasterThreePageModule { }
