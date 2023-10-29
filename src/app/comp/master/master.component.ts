import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { ContentData, GlobalService } from 'src/app/services/global.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'comp-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  @Input('datas') datas: ContentData[] = [];
  @Input('parent_name') parent_name: string = '';
  @Input('title') title: string = '';
  @Input('defaultHref') defaultHref: string = '';

  thisRoute: string = '';
  nextRoute: string = '';
  createEditRoute: string = '';

  constructor(private modalController: ModalController,
    private globalService: GlobalService,
    private router: Router) { }

  ngOnInit() {
    this.GetThisRouteAndNextDefaultHref();
  }

  private GetThisRouteAndNextDefaultHref() {
    if (this.defaultHref == dataTemp.route.admin) {
      this.thisRoute = dataTemp.route.master;
      this.nextRoute = dataTemp.route.masterTwo;
      this.createEditRoute = dataTemp.route.createEditMaster;
    } else if (this.defaultHref == dataTemp.route.master) {
      this.thisRoute = dataTemp.route.masterTwo;
      this.nextRoute = dataTemp.route.masterThree;
      this.createEditRoute = dataTemp.route.createEditMasterTwo;
    } else if (this.defaultHref == dataTemp.route.masterTwo) {
      this.thisRoute = dataTemp.route.masterThree;
      this.nextRoute = dataTemp.route.masterFour;
      this.createEditRoute = dataTemp.route.createEditMasterThree;
    } else if (this.defaultHref == dataTemp.route.masterThree) {
      this.nextRoute = dataTemp.route.masterFour;
      this.nextRoute = dataTemp.route.masterFive;
      this.createEditRoute = dataTemp.route.createEditMasterFour;
    } else if (this.defaultHref == dataTemp.route.masterFour) {
      this.nextRoute = dataTemp.route.masterFive;
      this.nextRoute = dataTemp.route.masterSix;
      this.createEditRoute = dataTemp.route.createEditMasterFive;
    } else if (this.defaultHref == dataTemp.route.masterFive) {
      this.nextRoute = dataTemp.route.masterSix;
      this.nextRoute = dataTemp.route.masterSix;
      this.createEditRoute = dataTemp.route.createEditMasterSix;
    }
  }

  IsBtn(type: string): boolean { if (type == dataTemp.type.btn) return true; else return false; }
  
  IsBtnOutline(type: string): boolean { if (type == dataTemp.type.btnOutline) return true; else return false; }

  Open(x: ContentData) {
    const data = { data: x.data, title: x.title_alias ? x.title_alias : x.title!, defaultHref: this.thisRoute };
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    console.log('data btn', data);

    this.router.navigate([this.nextRoute], navigationExtras);
  }

  CreateEdit(x?: any) {
    const data = { data: x ? x : this.parent_name, title: this.title, defaultHref: this.thisRoute };
    let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
    console.log('data btn', data);

    this.router.navigate([this.createEditRoute], navigationExtras);
  }

  Delete(x: any) {
    // bikin dulu baru copy ke sampe 6, ke 2 dulu bole la utk transisi
  }
}
