import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { ContentData } from 'src/app/services/global.service';

@Component({
  selector: 'app-master-four',
  templateUrl: './master-four.page.html',
  styleUrls: ['./master-four.page.scss'],
})
export class MasterFourPage implements OnInit {
  datas: ContentData[] = [];
  param: any;

  // header
  parent_name: string | undefined;
  title: string | undefined;
  defaultHref: string | undefined;

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
    this.activatedRoute.queryParams.subscribe(async params => {
      if (this.param) await this.InitializeData();
      else {
        this.param = this.router.getCurrentNavigation()?.extras.state!['data'];

        this.parent_name = this.param!.data;
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
  }
}