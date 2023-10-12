import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
import { FetchService } from 'src/app/services/fetch.service';
import { Category, FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  data = dataTemp.tab;
  // masterDataListCollection: AngularFirestoreCollection<Category>;

  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private afs: AngularFirestore,
    private fetchService: FetchService) {
    // this.InitializeData();
  }

  async InitializeData() {
    // this.masterDataListCollection = this.afs.collection<Category>('triase', ref => ref.orderBy('id'));
    // this.firebaseService.masterDataList = this.firebaseService.triaseDataListCollection.valueChanges({ idField: 'idx' });

    // this.triaseDataList = await new Promise(resolve => {
    //   this.firebaseService.triaseDataList!.pipe(take(1)).subscribe((data: any) => {
    //     resolve(data);
    //   });
    // });
  }

  async ngOnInit() {
    const a = await this.fetchService.GetContents();
    console.log('contents', a);
  }

  Master(dt: string) {
    console.log(dt);
    let navigationExtras: NavigationExtras = {
      state: {
        data: dt
      }
    }
    this.router.navigate(['/tabs/profil/admin/master'], navigationExtras);
  }

  MasterChild(dt: string) {
    const title = dt == dataTemp.tab.nilaiNormalLab ? 'Nilai Normal Laboratorium' : 'Error';
    const titleAlias = dt == dataTemp.tab.nilaiNormalLab ? 'Laboratorium' : 'Error';
    const data: Category = { id: 0, data: dt, title: title, titleAlias: titleAlias };

    let navigationExtras: NavigationExtras = {
      state: {
        // aksi: data ? 'edit' : 'create',
        // dataParent: this.param,
        data: data,
        // lastNumber: this.datas.length
      }
    }
    this.router.navigate(['/tabs/profil/admin/master/master-child'], navigationExtras);
  }
}
