import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriaseChildPageRoutingModule } from './triase-child-routing.module';

import { TriaseChildPage } from './triase-child.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriaseChildPageRoutingModule
  ],
  declarations: [TriaseChildPage]
})
export class TriaseChildPageModule {}
