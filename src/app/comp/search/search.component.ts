import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { ContentData, GlobalService } from 'src/app/services/global.service';

export interface SearchData {
  id?: number;
  data: string;
}

@Component({
  selector: 'comp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Output() callParent = new EventEmitter();

  types = dataTemp.type;

  isFocusSearch: boolean = false;
  isSearch: boolean = false;
  inputs: string = '';

  lastSearch: SearchData[] = [];
  maySearch: any[] = [];
  search: ContentData[] = [];

  constructor(private globalService: GlobalService,
    private router: Router,
    private fetchService: FetchService,
    private loadingController: LoadingController,
    private authService: AuthService) {
    this.lastSearch = [
      { data: 'Triase' },
      { data: 'Resusitasi' },
      { data: 'Anomali' },
      { data: 'Tanda Vital' },
    ];
    this.maySearch = ['Triase', 'Resusitasi', 'Anomali', 'Tanda Vital'];
    this.InitializeData();
  }

  ngOnInit() {
    console.log('this.lastSearch', this.lastSearch);
    console.log('this.maySearch', this.maySearch);
  }

  InitializeData() {
    // this.GetLastSearch();
    // this.GetMaySearch();
  }

  searchInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log('Input', query);
    this.inputs = query;
    if (this.inputs.length > 0) this.isSearch = true; else this.isSearch = false;
  }

  async searchChange(event: any) {
    this.search = [];
    const query = event.target.value.toLowerCase();
    console.log('Search', query);

    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const datas = await this.fetchService.SearchContentsbyData(query);
      var list = [...new Set(datas.map((x: any) => x.parent_name))];
      list.forEach(x => {
        var aaa = datas.find((y: any) => y.parent_name == x);
        this.search.push(aaa);
      })

      console.log('this.search', this.search);
      loading.dismiss();
    } catch (error: any) {
      var msg = error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.search);
      loading.dismiss();
    }
  }

  searchFocus(event: any) {
    const query = event.target.value.toLowerCase();
    console.log('Focus', query);
    this.isFocusSearch = true;
    this.setEventForParent(this.isFocusSearch);
  }

  searchCancel(event: any) {
    const query = event.target.value.toLowerCase();
    console.log('Cancel', query);
    this.isFocusSearch = false;
    this.setEventForParent(this.isFocusSearch);
  }

  setEventForParent(isFocusSearch: boolean) {
    console.log('isFocusSearch', isFocusSearch);
    this.callParent.emit(isFocusSearch);
  }

  async ToDetail(x: ContentData) {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      console.log('x', x);
      if (x.type != dataTemp.type.btn) {
        const dt: ContentData = await this.GetContentbyData(x.parent_name);
        // const data = { data: dt.data, title: dt.title_alias ? dt.title_alias : dt.title!, defaultHref: this.thisRoute };
        // let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
        // this.router.navigate([this.nextRoute], navigationExtras);
        // console.log('data btn', data);
      } else {
        // const data = { data: x.data, title: x.title_alias ? x.title_alias : x.title!, defaultHref: this.thisRoute };
        // let navigationExtras: NavigationExtras = this.globalService.SetExtras(data);
        // this.router.navigate([this.nextRoute], navigationExtras);
        // console.log('data btn', data);
      }

      loading.dismiss();
    } catch (error: any) {
      var msg = error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.search);
      loading.dismiss();
    }

  }

  async GetContentbyData(data: string): Promise<ContentData> {
    const dt: ContentData = await this.fetchService.GetContentbyData(data);
    console.log('dt', dt);
    return dt;
  }
}
