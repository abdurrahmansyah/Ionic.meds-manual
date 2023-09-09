import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { Category, FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-survei-primer',
  templateUrl: './survei-primer.page.html',
  styleUrls: ['./survei-primer.page.scss'],
})
export class SurveiPrimerPage implements OnInit {
  surveiPrimerDataList: Category[] = []
  title: string = dataTemp.title.surveiPrimer;
 
  constructor(private firebaseService: FirebaseService,
    private router: Router) {
    this.InitializeData();
  }

  async InitializeData() {
    this.firebaseService.surveiPrimerDataList = this.firebaseService.surveiPrimerDataListCollection.valueChanges({ idField: 'idx' });

    this.surveiPrimerDataList = await new Promise(resolve => {
      this.firebaseService.surveiPrimerDataList!.pipe(take(1)).subscribe((data: any) => {
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
        defaultHref: dataTemp.route.surveiPrimer
      }
    }
    this.router.navigate([dataTemp.route.asesmenDetail], navigationExtras);
  }

  ngOnInit() {
  }

}