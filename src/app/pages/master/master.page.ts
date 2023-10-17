import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { Category, SubCategory } from 'src/app/services/firebase.service';
import { ContentData } from 'src/app/services/global.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  /*
  param: string | undefined;
  triaseDataList: Category[] = []
  triaseData: Category | undefined;
  datas: Category[] = [];
  title: string | undefined;
  titleHeader: string = 'Master Data';
  defaultHref: string = 'tabs/profil/admin';
  */

  datas: ContentData[] = [];
  param: any;

  // header
  title: string | undefined;
  defaultHref: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fetchService: FetchService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private location: Location) { }
  /*
    private afs: AngularFirestore) { }
  */

  async ngOnInit() {
    // beberapa fungsi yang dapat digunakan untuk mengambil route state
    console.log('data state 1', this.location.getState());
    console.log('data state 2', history.state.data);

    await this.GetExtras();
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

  private async GetExtras() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (this.param) await this.InitializeData();
      else {
        this.param = this.router.getCurrentNavigation()?.extras.state!['data'];
        // this.param = this.router.getCurrentNavigation()?.extras.state == null || undefined ? '' : this.router.getCurrentNavigation()?.extras.state!['data'];
  
        this.title = this.param!.titleAlias ? this.param!.titleAlias : this.param!.title;
        this.defaultHref = this.param!.defaultHref;
      }
      console.log('this.param', this.param);
    });
  }

  async InitializeData() {
    console.log('this.param.data', this.param.data);
    this.datas = await this.fetchService.GetContentsbyName(this.param.data);
    console.log('resbywpdb', this.datas);

    // if (this.datas.filter(x => x.type == dataTemp.subCategory.audio).length > 0) {
    //   const url = '../../../assets/audios/'
    //   this.datas.forEach(x => {
    //     if (x.type == dataTemp.subCategory.audio) x.data = url + x.data + '.mp3'
    //   })
    // }
  }

  // nanti masuk komponen


  /*
  async ngOnInit() {
    await this.GetExtras();
    this.InitializeData();
  }

  private async GetExtras() {
    this.param = await new Promise(resolve => {
      this.activatedRoute.queryParams.subscribe((param: any) => {
        var data = this.router.getCurrentNavigation()?.extras.state!['data'];
        resolve(data);
      });
    });
    console.log('param', this.param);
  }

  async InitializeData() {
    this.GetTitle();
    // console.log('param 2', this.param);

    var listCollection = this.afs.collection<Category>(this.param!, ref => ref.orderBy('id'));
    listCollection.valueChanges({ idField: 'idx' }).subscribe(data => {
      this.datas = data;
      console.log('dtx', this.datas);
    });
  }

  GetTitle() {
    this.title = this.param == dataTemp.tab.triase ? dataTemp.title.triase :
      this.param == dataTemp.tab.surveiPrimer ? dataTemp.title.surveiPrimer :
        this.param == dataTemp.tab.surveiSekunder ? dataTemp.title.surveiSekunder :
          this.param == dataTemp.tab.tandaVital ? dataTemp.title.tandaVital :
            'Master Data';
  }

  CreateEdit(data?: Category) {
    let navigationExtras: NavigationExtras = {
      state: {
        aksi: data ? 'edit' : 'create',
        dataParent: this.param,
        data: data,
        lastNumber: this.datas.length
      }
    }
    this.router.navigate(['/tabs/profil/admin/create-edit-parent-master'], navigationExtras);
  }

  Open(data: Category) {
    let navigationExtras: NavigationExtras = {
      state: {
        // aksi: data ? 'edit' : 'create',
        dataParent: this.param,
        data: data,
        // lastNumber: this.datas.length
      }
    }
    this.router.navigate(['/tabs/profil/admin/master/master-child'], navigationExtras);
  }

  IsText(type: string) {
    if (type == 'text') return true;
    else return false;
  }

  IsSub(type: string) {
    if (type == 'sub') return true;
    else return false;
  }

  IsImg(type: string) {
    if (type == 'img') return true;
    else return false;
  }

  IsRef(type: string) {
    if (type == 'ref') return true;
    else return false;
  }

  Triase(x: Category) {
    console.log(x);
  }
  */

}
