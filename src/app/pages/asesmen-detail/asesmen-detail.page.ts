import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PhotoviewerComponent } from 'src/app/comp/photoviewer/photoviewer.component';
import { dataTemp } from 'src/app/dataTemp';
import { Category, SubCategory } from 'src/app/services/firebase.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-asesmen-detail',
  templateUrl: './asesmen-detail.page.html',
  styleUrls: ['./asesmen-detail.page.scss'],
})
export class AsesmenDetailPage implements OnInit {
  datas: SubCategory[] = [];
  param: Category | undefined;

  // header
  title: string | undefined;
  defaultHref: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private modalController: ModalController,
    private globalService: GlobalService
  ) { }

  async ngOnInit() {
    await this.GetExtras();
    this.InitializeData();
  }

  private async GetExtras() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.param = this.router.getCurrentNavigation()?.extras.state!['data'];
      this.title = this.param!.titleAlias ? this.param!.titleAlias : this.param!.title;
      this.defaultHref = this.router.getCurrentNavigation()?.extras.state!['defaultHref'];
      console.log('this.param', this.param);
    });
  }

  async InitializeData() {
    var listCollection = this.afs.collection<SubCategory>(this.param!.data, ref => ref.orderBy('id'));
    listCollection.valueChanges({ idField: 'idx' }).subscribe(data => {
      this.datas = data;

      if (this.datas.filter(x => x.type == dataTemp.subCategory.audio).length > 0) {
        const url = '../../../assets/audios/'
        this.datas.forEach(x => {
          if (x.type == dataTemp.subCategory.audio) x.data = url + x.data + '.mp3'
        })
      }
    });
  }

  IsText(type: string) {
    if (type == dataTemp.subCategory.text) return true;
    else return false;
  }

  IsSub(type: string) {
    if (type == dataTemp.subCategory.sub) return true;
    else return false;
  }

  IsSubSub(type: string) {
    if (type == dataTemp.subCategory.subsub) return true;
    else return false;
  }

  IsImg(type: string) {
    if (type == dataTemp.subCategory.img) return true;
    else return false;
  }

  IsRef(type: string) {
    if (type == dataTemp.subCategory.ref) return true;
    else return false;
  }

  IsBtn(type: string) {
    if (type == dataTemp.subCategory.btn) return true;
    else return false;
  }

  IsAudio(type: string) {
    if (type == dataTemp.subCategory.audio) return true;
    else return false;
  }

  IsWithImage(data: SubCategory) {
    if (data.image) return true
    else return false;
  }

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

  BtnThru(data: SubCategory) { // PERLU EDIT
    try {
      console.log('tes', data);
      
      const newData: Category = { id: 0, data: data.data, title: data.title!, titleAlias: data.titleAlias };
      var tabParent = this.GetTabParent(data.tabParent!);
      var tabTo = this.GetTabTo(data.tabParent!);

      console.log('btnThru data: PERLU EDIT', data);
      console.log('btnThru newData: PERLU EDIT', newData);
      console.log('tabParent', tabParent);
      console.log('tabTo', tabTo);

      let navigationExtras: NavigationExtras = {
        state: {
          data: newData,
          defaultHref: tabParent
        }
      }
      this.router.navigate([tabTo], navigationExtras);
    } catch (e: any) {
      console.log(e);
      this.globalService.PresentToast(e);

    }
  }

  GetTabParent(tab: string): string {
    if (!tab) throw 'Eror: Tab parent kosong';
    if (tab == dataTemp.bagian.asesmen) return dataTemp.route.asesmenDetail;
    else if (tab == dataTemp.bagian.penunjang) return dataTemp.route.penunjang;
    else if (tab == dataTemp.bagian.panduan) return dataTemp.route.panduan;
    else return dataTemp.route.obat;
  }

  GetTabTo(tab: string): string {
    if (!tab) throw 'Eror: Tab parent kosong';
    // if (tab == dataTemp.bagian.asesmen) return dataTemp.route.asesmenDetail;
    if (tab == dataTemp.bagian.asesmen) return dataTemp.route.asesmenDetail + '/detail';
    else if (tab == dataTemp.bagian.penunjang) return dataTemp.route.penunjangDetail;
    else return dataTemp.route.panduanDetail;
  }
}