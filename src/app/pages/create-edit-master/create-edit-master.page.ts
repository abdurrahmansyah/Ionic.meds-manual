import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { Category, SubCategory } from 'src/app/services/firebase.service';
import { GlobalService } from 'src/app/services/global.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-create-edit-master',
  templateUrl: './create-edit-master.page.html',
  styleUrls: ['./create-edit-master.page.scss'],
})
export class CreateEditMasterPage implements OnInit {
  //Nav Data
  aksi: string | undefined;
  dataParent: Category | undefined;
  param: SubCategory | undefined;

  // datas: Category[] = [];
  title: string | undefined;
  private subCategoryDataDoc: AngularFirestoreDocument<SubCategory>;
  private subCategoryDataListCollection: AngularFirestoreCollection<SubCategory>;

  // Model Data
  id: number = 0;
  type: string = dataTemp.subCategory.text;
  typeString: string = '';
  data: string | undefined;
  isImg: boolean = false;

  public actionSheetButtons = [
    { text: dataTemp.subCategoryString.text, data: { action: dataTemp.subCategory.text }, },
    { text: dataTemp.subCategoryString.sub, data: { action: dataTemp.subCategory.sub }, },
    { text: dataTemp.subCategoryString.img, data: { action: dataTemp.subCategory.img }, },
    { text: dataTemp.subCategoryString.ref, data: { action: dataTemp.subCategory.ref }, },
    { text: 'Cancel', role: 'cancel', data: { action: 'cancel', }, },
  ];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private authService: AuthService,
    private globalService: GlobalService,
    private photoService: PhotoService,
    private loadingController: LoadingController) {
    this.subCategoryDataDoc = this.afs.doc<SubCategory>(`example/1`);
    this.subCategoryDataListCollection = this.afs.collection<SubCategory>('example');
  }

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
        var data = this.router.getCurrentNavigation()?.extras.state!['data'];
        resolve(data);
      });
    });

    console.log('aksi', this.aksi);
    console.log('dataParent', this.dataParent);
    console.log('param', this.param);
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
    // console.log('dtsss', this.param);
  }

  async PrepareData() {
    this.subCategoryDataListCollection = this.afs.collection<SubCategory>(this.dataParent!.data);
    // this.id = this.dataParent?.id + 1;

  }

  SetView() {
    console.log('this.type', this.type);
    console.log('this.typeString', this.typeString);

    this.isImg = this.type == dataTemp.subCategory.img ? true : false;
    console.log('isImg', this.isImg);
  }

  GetTypeString() {
    return this.type == dataTemp.subCategory.text ? dataTemp.subCategoryString.text :
      this.type == dataTemp.subCategory.sub ? dataTemp.subCategoryString.sub :
        this.type == dataTemp.subCategory.img ? dataTemp.subCategoryString.img :
          this.type == dataTemp.subCategory.ref ? dataTemp.subCategoryString.ref : 'Data Tidak Valid';
  }

  GetTitle() {
    this.title = this.dataParent?.title;
  }

  GetType(ev: any) {
    this.type = ev.detail.data.action
    this.typeString = this.GetTypeString();
    console.log(this.type);
    console.log(this.typeString);
  }

  IsCreate() {
    if (this.aksi == 'create') return true;
    else return false;
  }

  async ChangeImage() {
    const image = await this.photoService.TakeAPhoto();
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const name = 'img-' + (Math.random() + 1).toString(36).substring(3);
      // this.lampiranString = name + '.png';
      this.data = await this.photoService.UploadFile(image, name);
      console.log('this.data', this.data);
      if (this.data == '') throw ('Gagal memuat foto! Coba lagi'); else loading.dismiss();
    } catch (error: any) {
      loading.dismiss()
      this.globalService.PresentToast(error);
    }
  }

  async CreateEdit() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      var subCategoryData: SubCategory = { id: this.id ? this.id : 0, type: this.type!, data: this.data! }

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

}
