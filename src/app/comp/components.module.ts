import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TermAndCondPage } from './term-and-cond/term-and-cond.page';
import { PhotoviewerComponent } from './photoviewer/photoviewer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [TermAndCondPage, PhotoviewerComponent, HeaderComponent],
  exports: [TermAndCondPage, PhotoviewerComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
