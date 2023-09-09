import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { Category, FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-survei-sekunder',
  templateUrl: './survei-sekunder.page.html',
  styleUrls: ['./survei-sekunder.page.scss'],
})
export class SurveiSekunderPage implements OnInit {
  surveiSekunderDataList: Category[] = []
  title: string = dataTemp.title.surveiSekunder;
 
  constructor(private firebaseService: FirebaseService,
    private router: Router) {
    this.InitializeData();
  }

  async InitializeData() {
    this.firebaseService.surveiSekunderDataList = this.firebaseService.surveiSekunderDataListCollection.valueChanges({ idField: 'idx' });

    this.surveiSekunderDataList = await new Promise(resolve => {
      this.firebaseService.surveiSekunderDataList!.pipe(take(1)).subscribe((data: any) => {
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

  CategoryChild(data: Category) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
        defaultHref: dataTemp.route.surveiSekunder
      }
    }
    this.router.navigate([dataTemp.route.asesmenDetail], navigationExtras);
  }

  ngOnInit() {
  }
}