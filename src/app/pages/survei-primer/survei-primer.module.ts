import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveiPrimerPageRoutingModule } from './survei-primer-routing.module';

import { SurveiPrimerPage } from './survei-primer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveiPrimerPageRoutingModule
  ],
  declarations: [SurveiPrimerPage]
})
export class SurveiPrimerPageModule {}
