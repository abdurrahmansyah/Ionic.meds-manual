import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentFivePageRoutingModule } from './content-five-routing.module';

import { ContentFivePage } from './content-five.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentFivePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContentFivePage]
})
export class ContentFivePageModule {}
