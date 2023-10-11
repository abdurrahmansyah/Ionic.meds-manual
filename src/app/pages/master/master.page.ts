import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { Category, SubCategory } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  param: string | undefined;
  triaseDataList: Category[] = []
  triaseData: Category | undefined;
  datas: Category[] = [];
  title: string | undefined;
  titleHeader: string = 'Master Data';
  defaultHref: string = 'tabs/profil/admin';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore) { }

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

}
