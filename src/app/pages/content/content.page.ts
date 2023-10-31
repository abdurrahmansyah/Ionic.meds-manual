import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { ContentData } from 'src/app/services/global.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  datas: ContentData[] = [];
  param: any;

  // header
  title: string | undefined;
  defaultHref: string | undefined;

  isFocusSearch: boolean = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fetchService: FetchService,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.GetExtras();
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      await this.InitializeData();
      loading.dismiss();
    } catch (error: any) {
      var msg = error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
      loading.dismiss();
    }
  }

  private async GetExtras() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.param) return;
      else {
        this.param = this.router.getCurrentNavigation()?.extras.state!['data'];

        this.title = this.param!.titleAlias ? this.param!.titleAlias : this.param!.title;
        this.defaultHref = this.param!.defaultHref;
      }
      console.log('this.param', this.param);
    });
  }

  async InitializeData() {
    console.log('this.param.data', this.param.data);
    this.datas = await this.fetchService.GetContentsbyName(this.param.data);
    console.log('resbywpdb', this.datas);

    if (this.datas.filter(x => x.type == dataTemp.type.audio).length > 0) {
      const url = '../../../assets/audios/'
      this.datas.forEach(x => {
        if (x.type == dataTemp.type.audio) x.data = url + x.data + '.mp3'
      })
    }
  }

  getEventOutput($event: any) {
    this.isFocusSearch = $event;
  }
}