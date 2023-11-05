import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { PhotoviewerComponent } from 'src/app/comp/photoviewer/photoviewer.component';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { ContentData, GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-obat',
  templateUrl: './obat.page.html',
  styleUrls: ['./obat.page.scss'],
})
export class ObatPage implements OnInit {
  // master
  tabs = dataTemp.tab;
  titles = dataTemp.title;

  datas: ContentData[] = [];

  isFocusSearch: boolean = false;
  defaultHref: string = dataTemp.route.obat;

  constructor(private router: Router,
    private fetchService: FetchService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private modalController: ModalController,
    private globalService: GlobalService
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      await this.InitializeData();
      loading.dismiss();
    } catch (error: any) {
      var msg = error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
      loading.dismiss();
    }
  }

  async InitializeData() {
    this.datas = await this.fetchService.GetContentsbyName(dataTemp.tab.obat);
    console.log('resbywpdb', this.datas);

    if (this.datas.filter(x => x.type == dataTemp.type.audio).length > 0) {
      const url = '../../../assets/audios/'
      this.datas.forEach(x => {
        if (x.type == dataTemp.type.audio) x.data = url + x.data + '.mp3'
      })
    }
  }

  IsText(type: string): boolean { if (type == dataTemp.type.text) return true; else return false; }
  IstTextWithMargin(type: string): boolean { if (type == dataTemp.type.textWithMargin) return true; else return false; }
  IsTextWithoutMargin(type: string): boolean { if (type == dataTemp.type.textWithoutMargin) return true; else return false; }
  IsSub(type: string): boolean { if (type == dataTemp.type.sub) return true; else return false; }
  IsSubWithoutMargin(type: string): boolean { if (type == dataTemp.type.subWithoutMargin) return true; else return false; }
  IsSubSub(type: string): boolean { if (type == dataTemp.type.subsub) return true; else return false; }
  IsSubsubWithoutMargin(type: string): boolean { if (type == dataTemp.type.subsubWithoutMargin) return true; else return false; }
  IsImg(type: string): boolean { if (type == dataTemp.type.img) return true; else return false; }
  IsNumbering0(type: string): boolean { if (type == dataTemp.type.numbering0) return true; else return false; }
  IsNumbering1(type: string): boolean { if (type == dataTemp.type.numbering1) return true; else return false; }
  IsNumbering2(type: string): boolean { if (type == dataTemp.type.numbering2) return true; else return false; }
  IsNumbering3(type: string): boolean { if (type == dataTemp.type.numbering3) return true; else return false; }
  IsNumbering4(type: string): boolean { if (type == dataTemp.type.numbering4) return true; else return false; }
  IsNumbering5(type: string): boolean { if (type == dataTemp.type.numbering5) return true; else return false; }
  IsNumbering6(type: string): boolean { if (type == dataTemp.type.numbering6) return true; else return false; }
  IsNumbering0WithoutMargin(type: string): boolean { if (type == dataTemp.type.numbering0WithoutMargin) return true; else return false; }
  IsNumbering1WithoutMargin(type: string): boolean { if (type == dataTemp.type.numbering1WithoutMargin) return true; else return false; }
  IsNumbering2WithoutMargin(type: string): boolean { if (type == dataTemp.type.numbering2WithoutMargin) return true; else return false; }
  IsNumbering3WithoutMargin(type: string): boolean { if (type == dataTemp.type.numbering3WithoutMargin) return true; else return false; }
  IsNumbering4WithoutMargin(type: string): boolean { if (type == dataTemp.type.numbering4WithoutMargin) return true; else return false; }
  IsNumbering5WithoutMargin(type: string): boolean { if (type == dataTemp.type.numbering5WithoutMargin) return true; else return false; }
  IsNumbering6WithoutMargin(type: string): boolean { if (type == dataTemp.type.numbering6WithoutMargin) return true; else return false; }
  IsRef(type: string): boolean { if (type == dataTemp.type.ref) return true; else return false; }
  IsBtn(type: string): boolean { if (type == dataTemp.type.btn) return true; else return false; }
  IsbtnOutline(type: string): boolean { if (type == dataTemp.type.btnOutline) return true; else return false; }
  IsAudio(type: string): boolean { if (type == dataTemp.type.audio) return true; else return false; }
  IsWithImage(data: ContentData): boolean { if (data.image) return true; else return false; }

  async ViewImage(data: string) {
    try {
      const modal = await this.modalController.create({
        component: PhotoviewerComponent,
        componentProps: {
          'dataSend': data
        }
      });

      return await modal.present();
    } catch (e: any) {
      console.log(e);
      this.globalService.PresentToast(e);
    }
  }

  BtnThru(x: ContentData) {
    const data = { data: x.data, title: x.title_alias ? x.title_alias : x.title!, defaultHref: dataTemp.route.obat };
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    console.log('data btn', data);

    this.router.navigate([dataTemp.route.contentObat], navigationExtras);
  }

  getEventOutput($event: any) {
    this.isFocusSearch = $event;
  }
}