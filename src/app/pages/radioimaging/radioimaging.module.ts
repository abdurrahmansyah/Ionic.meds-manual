import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RadioimagingPageRoutingModule } from './radioimaging-routing.module';

import { RadioimagingPage } from './radioimaging.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RadioimagingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RadioimagingPage]
})
export class RadioimagingPageModule {}
