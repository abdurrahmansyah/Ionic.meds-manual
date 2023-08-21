import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermAndCondPageRoutingModule } from './term-and-cond-routing.module';

import { TermAndCondPage } from './term-and-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermAndCondPageRoutingModule
  ],
  declarations: [TermAndCondPage]
})
export class TermAndCondPageModule {}
