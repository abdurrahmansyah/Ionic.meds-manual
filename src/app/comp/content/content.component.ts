import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { ContentData, GlobalService } from 'src/app/services/global.service';
import { PhotoviewerComponent } from '../photoviewer/photoviewer.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'comp-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  @Input('datas') datas: ContentData[] = [];
  @Input('defaultHref') defaultHref: string = '';

  thisRoute: string = '';
  nextRoute: string = '';

  constructor(private modalController: ModalController,
    private globalService: GlobalService,
    private router: Router) { }

  ngOnInit() {
    this.GetThisRouteAndNextDefaultHref();
  }

  private GetThisRouteAndNextDefaultHref() {
    // asesmen
    if (this.defaultHref == dataTemp.route.asesmen) {
      this.thisRoute = dataTemp.route.contentAsesmen;
      this.nextRoute = dataTemp.route.contentAsesmenTwo;
    } else if (this.defaultHref == dataTemp.route.contentAsesmen) {
      this.thisRoute = dataTemp.route.contentAsesmenTwo;
      this.nextRoute = dataTemp.route.contentAsesmenThree;
    } else if (this.defaultHref == dataTemp.route.contentAsesmenTwo) {
      this.thisRoute = dataTemp.route.contentAsesmenThree;
      this.nextRoute = dataTemp.route.contentAsesmenFour;
    } else if (this.defaultHref == dataTemp.route.contentAsesmenThree) {
      this.thisRoute = dataTemp.route.contentAsesmenFour;
      this.nextRoute = dataTemp.route.contentAsesmenFive;
    } else if (this.defaultHref == dataTemp.route.contentAsesmenFour) {
      this.thisRoute = dataTemp.route.contentAsesmenFive;
      this.nextRoute = dataTemp.route.contentAsesmenSix;
    } else if (this.defaultHref == dataTemp.route.contentAsesmenFive) {
      this.thisRoute = dataTemp.route.contentAsesmenSix;
      this.nextRoute = dataTemp.route.contentAsesmenSix;
    }
    // penunjang
    else if (this.defaultHref == dataTemp.route.penunjang) {
      this.thisRoute = dataTemp.route.contentPenunjang;
      this.nextRoute = dataTemp.route.contentPenunjangTwo;
    } else if (this.defaultHref == dataTemp.route.contentPenunjang) {
      this.thisRoute = dataTemp.route.contentPenunjangTwo;
      this.nextRoute = dataTemp.route.contentPenunjangThree;
    } else if (this.defaultHref == dataTemp.route.contentPenunjangTwo) {
      this.thisRoute = dataTemp.route.contentPenunjangThree;
      this.nextRoute = dataTemp.route.contentPenunjangFour;
    } else if (this.defaultHref == dataTemp.route.contentPenunjangThree) {
      this.thisRoute = dataTemp.route.contentPenunjangFour;
      this.nextRoute = dataTemp.route.contentPenunjangFive;
    } else if (this.defaultHref == dataTemp.route.contentPenunjangFour) {
      this.thisRoute = dataTemp.route.contentPenunjangFive;
      this.nextRoute = dataTemp.route.contentPenunjangSix;
    } else if (this.defaultHref == dataTemp.route.contentPenunjangFive) {
      this.thisRoute = dataTemp.route.contentPenunjangSix;
      this.nextRoute = dataTemp.route.contentPenunjangSix;
    }
    // panduan
    else if (this.defaultHref == dataTemp.route.panduan) {
      this.thisRoute = dataTemp.route.contentPanduan;
      this.nextRoute = dataTemp.route.contentPanduanTwo;
    } else if (this.defaultHref == dataTemp.route.contentPanduan) {
      this.thisRoute = dataTemp.route.contentPanduanTwo;
      this.nextRoute = dataTemp.route.contentPanduanThree;
    } else if (this.defaultHref == dataTemp.route.contentPanduanTwo) {
      this.thisRoute = dataTemp.route.contentPanduanThree;
      this.nextRoute = dataTemp.route.contentPanduanFour;
    } else if (this.defaultHref == dataTemp.route.contentPanduanThree) {
      this.thisRoute = dataTemp.route.contentPanduanFour;
      this.nextRoute = dataTemp.route.contentPanduanFive;
    } else if (this.defaultHref == dataTemp.route.contentPanduanFour) {
      this.thisRoute = dataTemp.route.contentPanduanFive;
      this.nextRoute = dataTemp.route.contentPanduanSix;
    } else if (this.defaultHref == dataTemp.route.contentPanduanFive) {
      this.thisRoute = dataTemp.route.contentPanduanSix;
      this.nextRoute = dataTemp.route.contentPanduanSix;
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
    const data = { data: x.data, title: x.title_alias ? x.title_alias : x.title!, defaultHref: this.thisRoute };
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    console.log('data btn', data);

    this.router.navigate([this.nextRoute], navigationExtras);
  }
}
