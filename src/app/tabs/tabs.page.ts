import { Component } from '@angular/core';
import { dataTemp } from '../dataTemp';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  iconAsesmen = dataTemp.icon.urlIconAsesmen;
  iconPenunjang = dataTemp.icon.urlIconPenunjang;
  iconPanduan = dataTemp.icon.urlIconPanduan;
  iconObat = dataTemp.icon.urlIconObat;
  iconProfil = dataTemp.icon.urlIconProfil;

  constructor() { }

  setIcon(ev: any) {
    this.iconAsesmen = ev.tab == dataTemp.tab.asesmen ||
      ev.tab == dataTemp.tab.triase ||
      ev.tab == dataTemp.tab.triaseChild ? dataTemp.icon.urlIconAsesmenSelected : dataTemp.icon.urlIconAsesmen;
    this.iconPenunjang = ev.tab == dataTemp.tab.penunjang ? dataTemp.icon.urlIconPenunjangSelected : dataTemp.icon.urlIconPenunjang;
    this.iconPanduan = ev.tab == dataTemp.tab.panduan ? dataTemp.icon.urlIconPanduanSelected : dataTemp.icon.urlIconPanduan;
    this.iconObat = ev.tab == dataTemp.tab.obat ? dataTemp.icon.urlIconObatSelected : dataTemp.icon.urlIconObat;
    this.iconProfil = ev.tab == dataTemp.tab.profil ||
      ev.tab == dataTemp.tab.admin ||
      ev.tab == dataTemp.tab.master ? dataTemp.icon.urlIconProfilSelected : dataTemp.icon.urlIconProfil;
  }
}