import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentThreePageRoutingModule } from './content-three-routing.module';

import { ContentThreePage } from './content-three.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentThreePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContentThreePage]
})
export class ContentThreePageModule {}
