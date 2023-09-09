import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveiSekunderPageRoutingModule } from './survei-sekunder-routing.module';

import { SurveiSekunderPage } from './survei-sekunder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveiSekunderPageRoutingModule
  ],
  declarations: [SurveiSekunderPage]
})
export class SurveiSekunderPageModule {}
