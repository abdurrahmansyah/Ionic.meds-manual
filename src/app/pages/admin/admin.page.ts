import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
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
    private afs: AngularFirestore) {
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

  ngOnInit() {
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
}
