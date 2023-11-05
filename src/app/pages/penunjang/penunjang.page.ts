import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-penunjang',
  templateUrl: './penunjang.page.html',
  styleUrls: ['./penunjang.page.scss'],
})
export class PenunjangPage implements OnInit {
  tabs = dataTemp.tab;
  titles = dataTemp.title;

  isFocusSearch: boolean = false;
  defaultHref: string = dataTemp.route.penunjang;

  constructor(private router: Router,
    private globalService: GlobalService) { }

  ngOnInit() { }

  Content(dt: string, title: string) {
    const data = { data: dt, title: title, defaultHref: dataTemp.route.penunjang };
    this.NavigatePage(data);
  }

  private NavigatePage(data: { data: string; title: string; defaultHref: string; }) {
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    this.router.navigate([dataTemp.route.contentPenunjang], navigationExtras);
  }

  getEventOutput($event: any) {
    this.isFocusSearch = $event;
  }

  /* CEK
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
  */
}
