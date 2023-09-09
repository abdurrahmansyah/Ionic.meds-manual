import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { Category, FirebaseService, SubCategory } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-triase',
  templateUrl: './triase.page.html',
  styleUrls: ['./triase.page.scss'],
})
export class TriasePage implements OnInit {
  triaseDataList: Category[] = []
  title: string = dataTemp.title.triase;
  
  constructor(private firebaseService: FirebaseService,
    private router: Router) {
    this.InitializeData();
  }

  async InitializeData() {
    this.firebaseService.triaseDataList = this.firebaseService.triaseDataListCollection.valueChanges({ idField: 'idx' });

    this.triaseDataList = await new Promise(resolve => {
      this.firebaseService.triaseDataList!.pipe(take(1)).subscribe((data: any) => {
        console.log(data);
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

  IsWithImage(data: Category) {
    if (data.image) return true
    else return false;
  }

  CategoryChild(data: Category) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
        defaultHref: dataTemp.route.triase
      }
    }
    this.router.navigate([dataTemp.route.asesmenDetail], navigationExtras);
  }

  ngOnInit() {
  }

}