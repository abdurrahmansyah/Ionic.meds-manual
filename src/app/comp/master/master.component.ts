import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { ContentData, GlobalService } from 'src/app/services/global.service';
import { PhotoviewerComponent } from '../photoviewer/photoviewer.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'comp-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  @Input('datas') datas: ContentData[] = [];
  @Input('title') title: string = '';
  @Input('defaultHref') defaultHref: string = '';

  thisRoute: string = '';
  nextRoute: string = '';
  createEditRoute: string = '';

  constructor(private modalController: ModalController,
    private globalService: GlobalService,
    private router: Router) { }

  ngOnInit() {
    this.GetThisRouteAndNextDefaultHref();
  }

  private GetThisRouteAndNextDefaultHref() {
    if (this.defaultHref == dataTemp.route.admin) {
      this.thisRoute = dataTemp.route.master;
      this.nextRoute = dataTemp.route.masterTwo;
      this.createEditRoute = dataTemp.route.createEditMaster;
    } else if (this.defaultHref == dataTemp.route.master) {
      this.thisRoute = dataTemp.route.masterTwo;
      this.nextRoute = dataTemp.route.masterThree;
    } else if (this.defaultHref == dataTemp.route.masterTwo) {
      this.thisRoute = dataTemp.route.masterThree;
      this.nextRoute = dataTemp.route.masterFour;
    } else if (this.defaultHref == dataTemp.route.masterThree) {
      this.nextRoute = dataTemp.route.masterFour;
      this.nextRoute = dataTemp.route.masterFive;
    } else if (this.defaultHref == dataTemp.route.masterFour) {
      this.nextRoute = dataTemp.route.masterFive;
      this.nextRoute = dataTemp.route.masterSix;
    } else if (this.defaultHref == dataTemp.route.masterFive) {
      this.nextRoute = dataTemp.route.masterSix;
      this.nextRoute = dataTemp.route.masterSix;
    }
  }

  // IsText(type: string): boolean { if (type == dataTemp.subCategory.text) return true; else return false; }

  // IsSub(type: string): boolean { if (type == dataTemp.subCategory.sub) return true; else return false; }

  // IsSubSub(type: string): boolean { if (type == dataTemp.subCategory.subsub) return true; else return false; }

  // IsImg(type: string): boolean { if (type == dataTemp.subCategory.img) return true; else return false; }

  // IsRef(type: string): boolean { if (type == dataTemp.subCategory.ref) return true; else return false; }

  // IsBtn(type: string): boolean { if (type == dataTemp.subCategory.btn) return true; else return false; }

  // IsAudio(type: string): boolean { if (type == dataTemp.subCategory.audio) return true; else return false; }

  // IsWithImage(data: ContentData): boolean { if (data.image) return true; else return false; }

  // async ViewImage(data: string) {
  //   try {
  //     const modal = await this.modalController.create({
  //       component: PhotoviewerComponent,
  //       componentProps: {
  //         'dataSend': data
  //       }
  //     });

  //     return await modal.present();
  //   } catch (e: any) {
  //     console.log(e);
  //     this.globalService.PresentToast(e);
  //   }
  // }

  // BtnThru(x: ContentData) {
  //   const data = { data: x.data, title: x.title_alias ? x.title_alias : x.title!, defaultHref: this.thisRoute };
  //   let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
  //   console.log('data btn', data);

  //   this.router.navigate([this.nextDefaultHref], navigationExtras);
  // }

  IsBtn(type: string): boolean { if (type == dataTemp.subCategory.btn) return true; else return false; }

  Open(x: ContentData) {
    const data = { data: x.data, title: x.title_alias ? x.title_alias : x.title!, defaultHref: this.thisRoute };
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    console.log('data btn', data);

    this.router.navigate([this.nextRoute], navigationExtras);
  }

  CreateEdit(x?: any) {
    const data = { data: x ? x : this.datas.find(x => x)?.parent_name, title: this.title, defaultHref: this.thisRoute };
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    console.log('data btn', data);

    this.router.navigate([this.createEditRoute], navigationExtras);
  }

  Delete(x: any) { }

  // CreateEdit(data?: any) {
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       aksi: data ? 'edit' : 'create',
  //       // dataParent: this.param,
  //       data: data,
  //       lastNumber: this.datas.length
  //     }
  //   }
  //   this.router.navigate(['/tabs/profil/admin/master/create-edit-master'], navigationExtras);
  //   // this.router.navigate(['/tabs/profil/admin/create-edit-parent-master'], navigationExtras);
  // }

  // Open(data: Category) {
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       // aksi: data ? 'edit' : 'create',
  //       dataParent: this.param,
  //       data: data,
  //       // lastNumber: this.datas.length
  //     }
  //   }
  //   this.router.navigate(['/tabs/profil/admin/master/master-child'], navigationExtras);
  // }

}
