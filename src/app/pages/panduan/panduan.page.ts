import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-panduan',
  templateUrl: './panduan.page.html',
  styleUrls: ['./panduan.page.scss'],
})
export class PanduanPage implements OnInit {
  tabs = dataTemp.tab;
  titles = dataTemp.title;

  isFocusSearch: boolean = false;
  defaultHref: string = dataTemp.route.panduan;

  constructor(private router: Router,
    private globalService: GlobalService) { }

  ngOnInit() { }

  Content(dt: string, title: string) {
    const data = { data: dt, title: title, defaultHref: dataTemp.route.panduan };
    this.NavigatePage(data);
  }

  private NavigatePage(data: { data: string; title: string; defaultHref: string; }) {
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    this.router.navigate([dataTemp.route.contentPanduan], navigationExtras);
  }

  getEventOutput($event: any) {
    this.isFocusSearch = $event;
  }
}
