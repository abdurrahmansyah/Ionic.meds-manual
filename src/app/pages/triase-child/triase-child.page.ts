import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Category, SubCategory } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-triase-child',
  templateUrl: './triase-child.page.html',
  styleUrls: ['./triase-child.page.scss'],
})
export class TriaseChildPage implements OnInit {
  triaseDataList: Category[] = []
  triaseData: Category | undefined;
  datas: SubCategory[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.GetExtras();
    this.InitializeData();
  }

  private async GetExtras() {
    // this.triaseData = await new Promise(resolve => {
    //   this.activatedRoute.queryParams.subscribe((param: any) => {
    //     var data = this.router.getCurrentNavigation()?.extras.state!['data'];
    //     resolve(data);
    //   });
    // });

    this.activatedRoute.queryParams.subscribe(params => {
      this.triaseData = this.router.getCurrentNavigation()?.extras.state!['data'];
    });
  }

  async InitializeData() {
    var listCollection = this.afs.collection<SubCategory>(this.triaseData!.data, ref => ref.orderBy('id'));
    var list = listCollection.valueChanges({ idField: 'idx' });

    this.datas = await new Promise(resolve => {
      list.pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      })
    })
    console.log(this.datas);

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
