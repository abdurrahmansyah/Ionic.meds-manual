import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TermAndCondPage } from './term-and-cond/term-and-cond.page';
import { PhotoviewerComponent } from './photoviewer/photoviewer.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { MasterComponent } from './master/master.component';
import { CreateEditMasterComponent } from './create-edit-master/create-edit-master.component';

@NgModule({
  declarations: [TermAndCondPage, PhotoviewerComponent, HeaderComponent, ContentComponent, MasterComponent, CreateEditMasterComponent],
  exports: [TermAndCondPage, PhotoviewerComponent, HeaderComponent, ContentComponent, MasterComponent, CreateEditMasterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
