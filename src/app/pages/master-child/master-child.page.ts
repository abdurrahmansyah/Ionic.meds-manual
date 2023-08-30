import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { Category, SubCategory } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-master-child',
  templateUrl: './master-child.page.html',
  styleUrls: ['./master-child.page.scss'],
})
export class MasterChildPage implements OnInit {
  aksi: string | undefined;
  param: Category | undefined;
  // triaseDataList: Category[] = []
  // triaseData: Category | undefined;
  datas: SubCategory[] = [];
  title: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore) { }

  async ngOnInit() {
    await this.GetExtras();
    if (this.aksi != dataTemp.aksi.create) this.InitializeData();
  }

  private async GetExtras() {
    this.param = await new Promise(resolve => {
      this.activatedRoute.queryParams.subscribe((param: any) => {
        this.aksi = this.router.getCurrentNavigation()?.extras.state!['aksi'];
        var data = this.router.getCurrentNavigation()?.extras.state!['data'];
        resolve(data);
      });
    });

    console.log('param', this.param);
  }

  async InitializeData() {
    this.GetTitle();

    var listCollection = this.afs.collection<SubCategory>(this.param!.data, ref => ref.orderBy('id'));
    var list = listCollection.valueChanges({ idField: 'idx' });

    this.datas = await new Promise(resolve => {
      list.pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      })
    })
    console.log('dtx', this.datas);
  }

  GetTitle() {
    this.title = this.param?.title;
  }

  CreateEdit(data?: SubCategory) {
    let navigationExtras: NavigationExtras = {
      state: {
        aksi: data ? 'edit' : 'create',
        dataParent: this.param,
        data: data,
      }
    }
    this.router.navigate(['/tabs/profil/admin/master/create-edit-master'], navigationExtras);
  }
}
