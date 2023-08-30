import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { Category, FirebaseService, SubCategory } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-triase',
  templateUrl: './triase.page.html',
  styleUrls: ['./triase.page.scss'],
})
export class TriasePage implements OnInit {
  triaseDataList: Category[] = []
  constructor(private firebaseService: FirebaseService,
    private router: Router) {
    this.InitializeData();
  }

  async InitializeData() {
    this.firebaseService.triaseDataList = this.firebaseService.triaseDataListCollection.valueChanges({ idField: 'idx' });

    this.triaseDataList = await new Promise(resolve => {
      this.firebaseService.triaseDataList!.pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      });
    });

    // this.triaseDataList.forEach(async triaseData => {
    //   // console.log(triaseData);
    //   // console.log(triaseData.title);
    //   var listCollection = this.afs.collection<SubCategory>(triaseData.data, ref => ref.orderBy('id'));
    //   var list = listCollection.valueChanges({ idField: 'idx' });
    //   var datas = await new Promise(resolve => {
    //     list.pipe(take(1)).subscribe((data: any) => {
    //       resolve(data);
    //     })
    //   })
    //   // console.log(datas);
    // });
  }

  TriaseChild(data: Category) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    }
    this.router.navigate(['/tabs/asesmen/triase/triase-child'], navigationExtras);
  }

  ngOnInit() {
  }

}
