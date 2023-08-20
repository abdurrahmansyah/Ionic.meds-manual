import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsesmenPageRoutingModule } from './asesmen-routing.module';

import { AsesmenPage } from './asesmen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsesmenPageRoutingModule
  ],
  declarations: [AsesmenPage]
})
export class AsesmenPageModule {}
