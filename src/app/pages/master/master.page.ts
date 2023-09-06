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
    console.log('param 2', this.param);

    var listCollection = this.afs.collection<Category>(this.param!, ref => ref.orderBy('id'));
    // var listCollection = this.afs.collection<Category>('triase', ref => ref.orderBy('id'));
    // var listCollection = this.afs.collection<Category>(this.param!);
    var list = listCollection.valueChanges({ idField: 'idx' });

    this.datas = await new Promise(resolve => {
      list.pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      })
    })
    console.log('dtx', this.datas);

    /////////////////////////////////////////// DEL LATER ///////////////////////////////////////////
    // COBA TELUSUR COLL GROUP
    // var comments = this.afs.collectionGroup<SubCategory>(this.triaseData!.data, ref => ref.orderBy('id'));
    // // var comments = this.afs.collectionGroup<SubCategory>(this.triaseData!.data, ref => ref.where('id', '==', '6'));
    // var asdfasdf = comments.valueChanges({ idField: 'idx' });
    // console.log('comments', comments);
    // console.log('asdfasdf', asdfasdf);

    // var datt: [] = await new Promise(resolve => {
    //   asdfasdf.pipe(take(1)).subscribe((dddd: any) => {
    //     console.log(dddd);
    //     resolve(dddd);
    //   })
    // })
    // console.log(datt);

    // comments$.subscribe(datt => {
    //   console.log('datt', datt);
    // })
    // console.log('cmnt', comments$);
    /////////////////////////////////////////// DEL LATER ///////////////////////////////////////////

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
        data: data,
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