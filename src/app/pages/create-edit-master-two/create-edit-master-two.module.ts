import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMasterTwoPageRoutingModule } from './create-edit-master-two-routing.module';

import { CreateEditMasterTwoPage } from './create-edit-master-two.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMasterTwoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateEditMasterTwoPage]
})
export class CreateEditMasterTwoPageModule { }
