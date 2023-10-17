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

  constructor(private router: Router,
    private globalService: GlobalService) { }

  ngOnInit() { }

  Content(dt: string, title: string){
    const data = { data: dt, title: title, defaultHref: dataTemp.route.admin };
    this.NavigatePage(data);
  }

  private NavigatePage(data: { data: string; title: string; defaultHref: string; }) {
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    this.router.navigate([dataTemp.route.contentAsesmen], navigationExtras);
  }
}