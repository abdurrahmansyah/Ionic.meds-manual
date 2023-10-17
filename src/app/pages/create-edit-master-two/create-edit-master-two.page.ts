import { Component, OnInit } from '@angular/core';
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
  selector: 'app-create-edit-master-two',
  templateUrl: './create-edit-master-two.page.html',
  styleUrls: ['./create-edit-master-two.page.scss'],
})
export class CreateEditMasterTwoPage implements OnInit {
  // Model Data
  id: number = 0;
  type: string = dataTemp.type.text;
  // typeString: string = '';
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
  param: any;

  // header
  title: string | undefined;
  defaultHref: string | undefined;

  actionSheetButtons = this.globalService.actionSheetButtons;
  actionSheetAudioButtons = this.globalService.actionSheetAudioButtons;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fetchService: FetchService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private globalService: GlobalService,
    private photoService: PhotoService
  ) {
  }

  async ngOnInit() {
    await this.GetExtras();
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      if (this.IsCreate()) await this.PrepareData();
      else {
        this.InitializeData()
        this.SetView();
      }
      loading.dismiss();
    } catch (error: any) {
      var msg = error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
      loading.dismiss();
    }
  }

  private async GetExtras() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.param = this.router.getCurrentNavigation()?.extras.state!['data'];

      this.title = this.param!.titleAlias ? this.param!.titleAlias : this.param!.title;
      this.defaultHref = this.param!.defaultHref;
      console.log('this.param', this.param);
    });
  }

  InitializeData() {
    this.id = this.param.data.urut;
    this.type = this.param?.data.type;
    // this.typeString = this.GetTypeString();
    this.data = this.param?.data.data;
    this.titleBtn = this.param?.data.title;
    this.titleAliasBtn = this.param?.data.titleAlias;
    this.imageBtn = this.param?.data.image;
  }

  async PrepareData() {
    const datas = await this.fetchService.GetContentsbyName(this.param.data);
    this.id = Math.max.apply(null, datas.map(function (o: any) { return o.urut; })) + 1;
    this.type = dataTemp.type.text;
    // this.typeString = this.GetTypeString();
    this.data = undefined;
  }

  SetView() {
    this.isImg = this.type == dataTemp.type.img ? true : false;
    this.isBtn = this.type == dataTemp.type.btn ? true : false;
    this.isAudio = this.type == dataTemp.type.audio ? true : false;
  }

  // GetTypeString() {
  //   return this.type == dataTemp.type.text ? dataTemp.typeString.text :
  //     this.type == dataTemp.type.sub ? dataTemp.typeString.sub :
  //       this.type == dataTemp.type.subsub ? dataTemp.typeString.subsub :
  //         this.type == dataTemp.type.img ? dataTemp.typeString.img :
  //           this.type == dataTemp.type.ref ? dataTemp.typeString.ref :
  //             this.type == dataTemp.type.btn ? dataTemp.typeString.btn :
  //               this.type == dataTemp.type.audio ? dataTemp.typeString.audio : 'Data Tidak Valid';
  // }

  // GetTitle() {
  //   this.title = this.dataParent?.title;
  // }

  GetType(ev: any) {
    this.type = ev.detail.data.action;
    // this.typeString = this.GetTypeString();
    this.SetView();
  }

  GetAudio(ev: any) {
    this.data = ev.detail.data.action;
  }

  // GetBagian(ev: any) {
  //   this.bagianBtn = ev.detail.data.action;
  // }

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
      console.log('this.imageBtn', this.imageBtn);
      console.log('this.data', this.data);
      if (this.data == '') throw ('Gagal memuat foto! Coba lagi'); else loading.dismiss(); // cek lagi kenapa cuma data tidak imagebtn juga
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
      if (this.isBtn) { if (!this.title) throw 'Title harus diisi'; }
      // if (this.isBtn && this.imageBtn) var subCategoryData: SubCategory = this.titleAliasBtn ? { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, titleAlias: this.titleAliasBtn!, image: this.imageBtn!, tabParent: this.bagianBtn } :
      //   { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, image: this.imageBtn!, tabParent: this.bagianBtn };
      // else if (this.isBtn) var subCategoryData: SubCategory = this.titleAliasBtn ? { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, titleAlias: this.titleAliasBtn!, tabParent: this.bagianBtn } :
      //   { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, tabParent: this.bagianBtn };
      // else var subCategoryData: SubCategory = { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, };
      console.log('cek create edit', this.param);

      const contentData: ContentData = {
        content_id: this.param.data.data == null || undefined ? '' : this.param.data.content_id,
        parent_name: this.param.data.data == null || undefined ? this.param.data : this.param.data.parent_name,
        urut: this.id, type: this.type, data: this.data!, title: this.titleBtn ? this.titleBtn : '',
        title_alias: this.titleAliasBtn ? this.titleAliasBtn : '', image: this.imageBtn ? this.imageBtn : ''
      };

      console.log('contentData utk dipost', contentData);

      if (this.IsCreate()) {
        var isUpdateSuccess: any = await this.CreateContent(contentData);
        console.log('isCreateSuccess', isUpdateSuccess);
        if (isUpdateSuccess.status == 'failed') throw ('Tidak berhasil membuat akun baru');

        // await this.subCategoryDataListCollection.add(subCategoryData);
        var msg = "Berhasil menambah data baru";
        await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
        await this.PrepareData();
      } else { // TERAKHIR DISINI, BELUM COBAIN UPDATE DAN CREATE
        var isUpdateSuccess: any = await this.UpdateContent(contentData);
        console.log('isCreateSuccess', isUpdateSuccess);
        if (isUpdateSuccess.status == 'failed') throw ('Tidak berhasil memperbarui akun baru');

        // await this.subCategoryDataDoc.update(subCategoryData);
        var msg = "Data Berhasil Diperbarui";
        await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
        // this.router.navigateByUrl('/tabs', { replaceUrl: true });
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

  SeeData() {
    const data: Category = { id: 0, data: this.data!, title: this.titleBtn! }
    let navigationExtras: NavigationExtras = {
      state: {
        // aksi: data ? 'edit' : 'create',
        // dataParent: this.param,
        data: data,
      }
    }
    console.log('masuk ga nih', data);

    this.router.navigate(['/tabs/profil/admin/master/create-edit-master/master-child-two'], navigationExtras); // cek kenapa extras tidak ngefek
  }

  /*
  async ngOnInit() {
    await this.GetExtras();
    this.GetTitle();
    if (this.aksi != dataTemp.aksi.create) await this.InitializeData();
    else this.PrepareData();
    this.SetView();
  }

  private async GetExtras() {
    this.param = await new Promise(resolve => {
      this.activatedRoute.queryParams.subscribe((param: any) => {
        this.aksi = this.router.getCurrentNavigation()?.extras.state!['aksi'];
        this.dataParent = this.router.getCurrentNavigation()?.extras.state!['dataParent'];
        this.lastNumber = this.router.getCurrentNavigation()?.extras.state!['lastNumber'];
        var data = this.router.getCurrentNavigation()?.extras.state!['data'];
        resolve(data);
      });
    });

    console.log('aksi', this.aksi);
    console.log('dataParent', this.dataParent);
    console.log('param', this.param);
    console.log('lastNumber', this.lastNumber);
  }

  async InitializeData() {
    this.subCategoryDataDoc = this.afs.doc<SubCategory>(this.dataParent!.data + '/' + this.param!.idx);
    var subCategoryData = this.subCategoryDataDoc.valueChanges();
    this.param = await new Promise(resolve => {
      subCategoryData.pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      })
    })
    this.id = this.param!.id;
    this.type = this.param?.type!;
    this.typeString = this.GetTypeString();
    this.data = this.param?.data;
    this.titleBtn = this.param?.title;
    this.titleAliasBtn = this.param?.titleAlias;
    this.imageBtn = this.param?.image;
    this.bagianBtn = this.param?.tabParent;
    // console.log('dtsss', this.param);
  }

  async PrepareData() {
    this.subCategoryDataListCollection = this.afs.collection<SubCategory>(this.dataParent!.data);
    this.id = this.lastNumber;
    // this.id = this.dataParent?.id + 1;

  }

  SetView() {
    // console.log('this.type', this.type);
    // console.log('this.typeString', this.typeString);

    this.isImg = this.type == dataTemp.subCategory.img ? true : false;
    this.isBtn = this.type == dataTemp.subCategory.btn ? true : false;
    this.isAudio = this.type == dataTemp.subCategory.audio ? true : false;
    // console.log('isImg', this.isImg);
  }

  GetTypeString() {
    return this.type == dataTemp.subCategory.text ? dataTemp.subCategoryString.text :
      this.type == dataTemp.subCategory.sub ? dataTemp.subCategoryString.sub :
        this.type == dataTemp.subCategory.subsub ? dataTemp.subCategoryString.subsub :
          this.type == dataTemp.subCategory.img ? dataTemp.subCategoryString.img :
            this.type == dataTemp.subCategory.ref ? dataTemp.subCategoryString.ref :
              this.type == dataTemp.subCategory.btn ? dataTemp.subCategoryString.btn :
                this.type == dataTemp.subCategory.audio ? dataTemp.subCategoryString.audio : 'Data Tidak Valid';
  }

  GetTitle() {
    this.title = this.dataParent?.title;
  }

  GetType(ev: any) {
    this.type = ev.detail.data.action;
    this.typeString = this.GetTypeString();
    this.SetView();
  }

  GetAudio(ev: any) {
    this.data = ev.detail.data.action;
  }

  GetBagian(ev: any) {
    this.bagianBtn = ev.detail.data.action;
  }

  IsCreate() {
    if (this.aksi == 'create') return true;
    else return false;
  }

  async ChangeImage(isImageBtn?: boolean) {
    const image = await this.photoService.TakeAPhoto();
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const name = 'img-' + (Math.random() + 1).toString(36).substring(3);
      // this.lampiranString = name + '.png';
      if (this.isBtn) this.imageBtn = await this.photoService.UploadFile(image, name);
      else this.data = await this.photoService.UploadFile(image, name);
      console.log('this.imageBtn', this.imageBtn);
      console.log('this.data', this.data);
      if (this.data == '') throw ('Gagal memuat foto! Coba lagi'); else loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.globalService.PresentToast(error);
    }
  }

  async CreateEdit() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      if (this.isBtn) { if (!this.bagianBtn) throw 'Bagian harus diisi'; }
      if (this.isBtn && this.imageBtn) var subCategoryData: SubCategory = this.titleAliasBtn ? { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, titleAlias: this.titleAliasBtn!, image: this.imageBtn!, tabParent: this.bagianBtn } :
        { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, image: this.imageBtn!, tabParent: this.bagianBtn };
      else if (this.isBtn) var subCategoryData: SubCategory = this.titleAliasBtn ? { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, titleAlias: this.titleAliasBtn!, tabParent: this.bagianBtn } :
        { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, title: this.titleBtn!, tabParent: this.bagianBtn };
      else var subCategoryData: SubCategory = { id: this.id ? +this.id : 0, type: this.type!, data: this.data!, };

      console.log('subCategoryData utk dipost', subCategoryData);

      if (this.IsCreate()) {
        await this.subCategoryDataListCollection.add(subCategoryData);
        var msg = "Berhasil menambah data baru";
        await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
      } else {
        await this.subCategoryDataDoc.update(subCategoryData);
        var msg = "Data Berhasil Diperbarui";
        await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
        // this.router.navigateByUrl('/tabs', { replaceUrl: true });
      }
      loading.dismiss();
    } catch (error) {
      var msg = this.IsCreate() ? "Gagal menambah data baru" : "Gagal memperbarui data";
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
      loading.dismiss();
    }
  }

  SeeData() {
    const data: Category = { id: 0, data: this.data!, title: this.titleBtn! }
    let navigationExtras: NavigationExtras = {
      state: {
        // aksi: data ? 'edit' : 'create',
        // dataParent: this.param,
        data: data,
      }
    }
    console.log('masuk ga nih', data);

    this.router.navigate(['/tabs/profil/admin/master/create-edit-master/master-child-two'], navigationExtras); // cek kenapa extras tidak ngefek
  }
  */
}