import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { Category, FirebaseService, SubCategory } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-radioimaging',
  templateUrl: './radioimaging.page.html',
  styleUrls: ['./radioimaging.page.scss'],
})
export class RadioimagingPage implements OnInit {
  categoryDataList: Category[] = []
  title: string = dataTemp.title.radioimaging;

  // route
  defaultHref: string = 'tabs/penunjang';
  
  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private afs: AngularFirestore) {
    this.InitializeData();
  }

  async InitializeData() {
    this.firebaseService.categoryDataListCollection = this.afs.collection<Category>(dataTemp.tab.radioimaging, ref => ref.orderBy('id'));
    this.firebaseService.categoryDataList = this.firebaseService.categoryDataListCollection.valueChanges({ idField: 'idx' });

    this.categoryDataList = await new Promise(resolve => {
      this.firebaseService.categoryDataList!.pipe(take(1)).subscribe((data: any) => {
        console.log(data);
        resolve(data);
      });
    });
  }

  IsWithImage(data: Category) {
    if (data.image) return true
    else return false;
  }

  CategoryChild(data: Category) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
        defaultHref: dataTemp.route.radioimaging
      }
    }
    this.router.navigate([dataTemp.route.penunjangDetail], navigationExtras);
  }

  ngOnInit() {
  }
}