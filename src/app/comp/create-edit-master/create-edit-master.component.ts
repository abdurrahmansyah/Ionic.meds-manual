import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { Category, SubCategory } from 'src/app/services/firebase.service';
import { ContentData, GlobalService } from 'src/app/services/global.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'comp-create-edit-master',
  templateUrl: './create-edit-master.component.html',
  styleUrls: ['./create-edit-master.component.scss'],
})
export class CreateEditMasterComponent implements OnInit {
  @Input('param') param: any;
  @Input('defaultHref') defaultHref: string = '';

  // Model Data
  id: number = 0;
  type: string = dataTemp.type.text;
  data: string | undefined;
  titleBtn: string | undefined;
  titleAliasBtn: string | undefined;
  imageBtn: string | undefined;

  // condition
  isImg: boolean = false;
  isBtn: boolean = false;
  isAudio: boolean = false;
  isCreate: boolean = false;

  datas: ContentData[] = [];
  // param: any;

  // header
  title: string | undefined;
  // defaultHref: string | undefined;

  actionSheetButtons = this.globalService.actionSheetButtons;
  actionSheetAudioButtons = this.globalService.actionSheetAudioButtons;

  constructor(
    private fetchService: FetchService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private globalService: GlobalService,
    private photoService: PhotoService
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      if (this.IsCreate()) await this.PrepareData();
      else this.InitializeData();

      this.SetView();
      loading.dismiss();
    } catch (error: any) {
      var msg = error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
      loading.dismiss();
    }
  }


  InitializeData() {
    this.id = this.param.data.urut;
    this.type = this.param?.data.type;
    this.data = this.param?.data.data;
    this.titleBtn = this.param?.data.title;
    this.titleAliasBtn = this.param?.data.title_alias;
    this.imageBtn = this.param?.data.image;
  }

  async PrepareData() {
    const datas = await this.fetchService.GetContentsbyName(this.param.data);
    this.id = Math.max.apply(null, datas.map(function (o: any) { return o.urut; })) + 1;
    this.type = dataTemp.type.text;
    this.data = undefined;
    this.titleBtn = undefined;
    this.titleAliasBtn = undefined;
    this.imageBtn = undefined;
  }

  SetView() {
    this.isImg = this.type == dataTemp.type.img ? true : false;
    this.isBtn = this.type == dataTemp.type.btn ? true : false;
    this.isAudio = this.type == dataTemp.type.audio ? true : false;
  }

  GetType(ev: any) {
    this.type = ev.detail.data.action;
    this.SetView();
  }

  GetAudio(ev: any) {
    this.data = ev.detail.data.action;
  }

  IsCreate() {
    if (this.param.data.data == null || undefined) return true;
    else return false;
  }

  async ChangeImage() {
    const image = await this.photoService.TakeAPhoto();
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const name = 'img-' + (Math.random() + 1).toString(36).substring(3);
      if (this.isBtn) this.imageBtn = await this.photoService.UploadFile(image, name);
      else this.data = await this.photoService.UploadFile(image, name);

      if (this.isBtn && this.imageBtn == undefined) throw ('Gagal memuat foto! Coba lagi');
      else if (!this.isBtn && this.data == undefined) throw ('Gagal memuat foto! Coba lagi');
      else loading.dismiss();
    } catch (error: any) {
      var msg = "Gagal menambah data baru: " + error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
      loading.dismiss();
    }
  }

  async CreateEdit() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      if (!this.type) throw 'Tipe harus diisi';
      if (!this.data) throw 'Data harus diisi';
      if (this.isBtn) { if (this.data.indexOf(' ') > 0) throw 'Data tidak boleh ada spasi'; }
      if (this.isBtn) { if (!this.titleBtn) throw 'Title harus diisi'; }

      const contentData: ContentData = {
        content_id: this.param.data.data == null || undefined ? '' : this.param.data.content_id,
        parent_name: this.param.data.data == null || undefined ? this.param.data : this.param.data.parent_name,
        urut: this.id, type: this.type, data: this.data!, title: this.titleBtn ? this.titleBtn : '',
        title_alias: this.titleAliasBtn ? this.titleAliasBtn : '', image: this.imageBtn ? this.imageBtn : ''
      };

      console.log('post data', contentData);

      if (this.IsCreate()) {
        var isUpdateSuccess: any = await this.CreateContent(contentData);
        if (isUpdateSuccess.status == 'failed') throw ('Tidak berhasil membuat akun baru');

        var msg = "Berhasil menambah data baru";
        await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
        await this.PrepareData();
        this.SetView();
      } else {
        var isUpdateSuccess: any = await this.UpdateContent(contentData);
        if (isUpdateSuccess.status == 'failed') throw ('Tidak berhasil memperbarui akun baru');

        var msg = "Data Berhasil Diperbarui";
        await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
      }
      loading.dismiss();
    } catch (error) {
      var msg = this.IsCreate() ? error ? "Gagal menambah data baru: " + error : "Gagal menambah data baru" : error ? "Gagal memperbarui data: " + error : "Gagal menambah data baru";
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
      loading.dismiss();
    }
  }

  private async CreateContent(contentData: ContentData) {
    const result = this.fetchService.CreateContent(contentData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  private async UpdateContent(contentData: ContentData) {
    const result = this.fetchService.UpdateContent(contentData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }
}
