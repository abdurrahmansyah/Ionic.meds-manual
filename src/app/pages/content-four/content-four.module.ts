import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentFourPageRoutingModule } from './content-four-routing.module';

import { ContentFourPage } from './content-four.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentFourPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContentFourPage]
})
export class ContentFourPageModule {}
