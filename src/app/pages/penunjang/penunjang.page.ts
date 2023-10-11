import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
import { Category } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-penunjang',
  templateUrl: './penunjang.page.html',
  styleUrls: ['./penunjang.page.scss'],
})
export class PenunjangPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() { }

  Radioimaging() { this.router.navigate([dataTemp.route.radioimaging]); }

  NilaiNormalLab() { 
    const data: Category = { id: 0, data: dataTemp.tab.nilaiNormalLab, title: dataTemp.title.nilaiNormalLab, titleAlias: 'Laboratorium' };

    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
        defaultHref: dataTemp.route.penunjang
      }
    }
    this.router.navigate([dataTemp.route.penunjangDetail], navigationExtras);
    // this.router.navigate([dataTemp.route.nilaiNormalLab]); 
  }

  EKG() { this.router.navigate([dataTemp.route.ekg]); }
}
