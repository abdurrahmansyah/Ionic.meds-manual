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

  constructor(private router: Router,
    private globalService: GlobalService) { }

  ngOnInit() { }

  Triase() {
    const data = { data: dataTemp.tab.triase, title: dataTemp.title.triase, defaultHref: dataTemp.route.asesmen };
    this.NavigatePage(data);
  }

  SurveiPrimer() { 
    const data = { data: dataTemp.tab.surveiPrimer, title: dataTemp.title.surveiPrimer, defaultHref: dataTemp.route.asesmen };
    this.NavigatePage(data);
  }

  SurveiSekunder() { this.router.navigate([dataTemp.route.surveiSekunder]); }

  TandaVital() { this.router.navigate([dataTemp.route.tandaVital]); }

  private NavigatePage(data: { data: string; title: string; defaultHref: string; }) {
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    this.router.navigate([dataTemp.route.contentAsesmen], navigationExtras);
  }
}
