import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsesmenPageRoutingModule } from './asesmen-routing.module';

import { AsesmenPage } from './asesmen.page';
import { ComponentsModule } from 'src/app/comp/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsesmenPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AsesmenPage]
})
export class AsesmenPageModule {}
