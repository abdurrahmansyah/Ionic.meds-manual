import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  tabs = dataTemp.tab;
  titles = dataTemp.title;

  constructor(private router: Router,
    private globalService: GlobalService) { }

  async ngOnInit() { }

  Master(dt: string, title: string) {
    const data = { data: dt, title: title, defaultHref: dataTemp.route.admin };
    if (this.globalService.profile.isSuperAdmin == true) this.NavigatePage(data);
  }

  private NavigatePage(data: { data: string; title: string; defaultHref: string; }) {
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    this.router.navigate([dataTemp.route.master], navigationExtras);
  }

  Users() {
    this.router.navigate([dataTemp.route.users]);
  }
}