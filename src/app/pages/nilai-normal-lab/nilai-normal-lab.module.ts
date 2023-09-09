import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NilaiNormalLabPageRoutingModule } from './nilai-normal-lab-routing.module';

import { NilaiNormalLabPage } from './nilai-normal-lab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NilaiNormalLabPageRoutingModule
  ],
  declarations: [NilaiNormalLabPage]
})
export class NilaiNormalLabPageModule {}
