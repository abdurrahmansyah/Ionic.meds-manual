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
      this.nextRoute = dataTemp.route.contentAsesmenFour;
      this.nextRoute = dataTemp.route.contentAsesmenFive;
    } else if (this.defaultHref == dataTemp.route.contentAsesmenFour) {
      this.nextRoute = dataTemp.route.contentAsesmenFive;
      this.nextRoute = dataTemp.route.contentAsesmenSix;
    } else if (this.defaultHref == dataTemp.route.contentAsesmenFive) {
      this.nextRoute = dataTemp.route.contentAsesmenSix;
      this.nextRoute = dataTemp.route.contentAsesmenSix;
    }
  }

  IsText(type: string): boolean { if (type == dataTemp.subCategory.text) return true; else return false; }

  IsSub(type: string): boolean { if (type == dataTemp.subCategory.sub) return true; else return false; }

  IsSubSub(type: string): boolean { if (type == dataTemp.subCategory.subsub) return true; else return false; }

  IsImg(type: string): boolean { if (type == dataTemp.subCategory.img) return true; else return false; }

  IsRef(type: string): boolean { if (type == dataTemp.subCategory.ref) return true; else return false; }

  IsBtn(type: string): boolean { if (type == dataTemp.subCategory.btn) return true; else return false; }

  IsAudio(type: string): boolean { if (type == dataTemp.subCategory.audio) return true; else return false; }

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
