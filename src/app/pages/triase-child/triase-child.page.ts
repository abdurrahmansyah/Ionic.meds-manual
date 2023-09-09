import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PhotoviewerComponent } from 'src/app/comp/photoviewer/photoviewer.component';
import { dataTemp } from 'src/app/dataTemp';
import { Category, SubCategory } from 'src/app/services/firebase.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-triase-child',
  templateUrl: './triase-child.page.html',
  styleUrls: ['./triase-child.page.scss'],
})
export class TriaseChildPage implements OnInit {
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
    console.log('btnThru: PERLU EDIT', data);

    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     data: data
    //   }
    // }
    // this.router.navigate(['/tabs/asesmen/triase/triase-child'], navigationExtras);
  }
}