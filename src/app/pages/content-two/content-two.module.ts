import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentTwoPageRoutingModule } from './content-two-routing.module';

import { ContentTwoPage } from './content-two.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentTwoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContentTwoPage]
})
export class ContentTwoPageModule {}
