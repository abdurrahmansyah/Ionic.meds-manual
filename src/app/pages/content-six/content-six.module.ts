import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentSixPageRoutingModule } from './content-six-routing.module';

import { ContentSixPage } from './content-six.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentSixPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContentSixPage]
})
export class ContentSixPageModule {}
