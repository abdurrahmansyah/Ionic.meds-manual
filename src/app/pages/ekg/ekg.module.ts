import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EkgPageRoutingModule } from './ekg-routing.module';

import { EkgPage } from './ekg.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EkgPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EkgPage]
})
export class EkgPageModule {}
