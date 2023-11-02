import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-asesmen',
  templateUrl: './asesmen.page.html',
  styleUrls: ['./asesmen.page.scss'],
})
export class AsesmenPage implements OnInit {
  tabs = dataTemp.tab;
  titles = dataTemp.title;

  isFocusSearch: boolean = false;
  defaultHref: string = dataTemp.route.asesmen;

  constructor(private router: Router,
    private globalService: GlobalService) { }

  ngOnInit() { }

  Content(dt: string, title: string) {
    // const route = dt == this.tabs.triase ? dataTemp.route.triase :
    //   dt == this.tabs.surveiPrimer ? dataTemp.route.surveiPrimer :
    //     dt == this.tabs.surveiSekunder ? dataTemp.route.surveiSekunder :
    //       dataTemp.route.tandaVital;
    // this.router.navigate([route]);
    const data = { data: dt, title: title, defaultHref: dataTemp.route.asesmen };
    this.NavigatePage(data);
  }

  private NavigatePage(data: { data: string; title: string; defaultHref: string; }) {
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    this.router.navigate([dataTemp.route.contentAsesmen], navigationExtras);
  }

  getEventOutput($event: any) {
    this.isFocusSearch = $event;
  }
}