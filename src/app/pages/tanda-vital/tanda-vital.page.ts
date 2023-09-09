import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { Category, FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tanda-vital',
  templateUrl: './tanda-vital.page.html',
  styleUrls: ['./tanda-vital.page.scss'],
})
export class TandaVitalPage implements OnInit {
  tandaVitalDataList: Category[] = []
  title: string = dataTemp.title.tandaVital;

  constructor(private firebaseService: FirebaseService,
    private router: Router) {
    this.InitializeData();
  }

  async InitializeData() {
    this.firebaseService.tandaVitalDataList = this.firebaseService.tandaVitalDataListCollection.valueChanges({ idField: 'idx' });

    this.tandaVitalDataList = await new Promise(resolve => {
      this.firebaseService.tandaVitalDataList!.pipe(take(1)).subscribe((data: any) => {
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
        defaultHref: dataTemp.route.tandaVital
      }
    }
    this.router.navigate([dataTemp.route.asesmenDetail], navigationExtras);
  }

  ngOnInit() {
  }
}