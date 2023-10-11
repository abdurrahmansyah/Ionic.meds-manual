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
  selector: 'app-create-edit-parent-master',
  templateUrl: './create-edit-parent-master.page.html',
  styleUrls: ['./create-edit-parent-master.page.scss'],
})
export class CreateEditParentMasterPage implements OnInit {
  //Nav Data
  aksi: string | undefined;
  dataParent: string | undefined;
  param: Category | undefined;
  lastNumber: number = 0;

  // datas: Category[] = [];
  title: string | undefined;
  private categoryDataDoc: AngularFirestoreDocument<Category>;
  private categoryDataListCollection: AngularFirestoreCollection<Category>;

  // Model Data
  id: number = 0;
  // type: string = dataTemp.subCategory.text;
  // typeString: string = '';
  data: string | undefined;
  titleCategory: string | undefined;
  titleAliasCategory: string | undefined;
  imageCategory: string | undefined;
  // isImg: boolean = false;
  // isBtn: boolean = false;

  // public actionSheetButtons = [
  //   { text: dataTemp.subCategoryString.text, data: { action: dataTemp.subCategory.text }, },
  //   { text: dataTemp.subCategoryString.sub, data: { action: dataTemp.subCategory.sub }, },
  //   { text: dataTemp.subCategoryString.img, data: { action: dataTemp.subCategory.img }, },
  //   { text: dataTemp.subCategoryString.ref, data: { action: dataTemp.subCategory.ref }, },
  //   { text: dataTemp.subCategoryString.btn, data: { action: dataTemp.subCategory.btn }, },
  //   { text: 'Cancel', role: 'cancel', data: { action: 'cancel', }, },
  // ];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private authService: AuthService,
    private globalService: GlobalService,
    private photoService: PhotoService,
    private loadingController: LoadingController) {
    this.categoryDataDoc = this.afs.doc<Category>(`example/1`);
    this.categoryDataListCollection = this.afs.collection<Category>('example');
  }

  async ngOnInit() {
    await this.GetExtras();
    this.GetTitle();
    if (this.aksi != dataTemp.aksi.create) await this.InitializeData();
    else this.PrepareData();
    // this.SetView();
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
    this.categoryDataDoc = this.afs.doc<Category>(this.dataParent + '/' + this.param!.idx);
    var subCategoryData = this.categoryDataDoc.valueChanges();
    this.param = await new Promise(resolve => {
      subCategoryData.pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      })
    })
    this.id = this.param!.id;
    this.titleCategory = this.param?.title!;
    this.titleAliasCategory = this.param?.titleAlias!;
    this.data = this.param?.data;
    // console.log('dtsss', this.param);
  }

  async PrepareData() {
    this.categoryDataListCollection = this.afs.collection<Category>(this.dataParent!);
    this.id = this.lastNumber;
  }

  // SetView() {
  //   // console.log('this.type', this.type);
  //   // console.log('this.typeString', this.typeString);

  //   this.isImg = this.type == dataTemp.subCategory.img ? true : false;
  //   this.isBtn = this.type == dataTemp.subCategory.btn ? true : false;
  //   // console.log('isImg', this.isImg);
  // }

  // GetTypeString() {
  //   return this.type == dataTemp.subCategory.text ? dataTemp.subCategoryString.text :
  //     this.type == dataTemp.subCategory.sub ? dataTemp.subCategoryString.sub :
  //       this.type == dataTemp.subCategory.img ? dataTemp.subCategoryString.img :
  //         this.type == dataTemp.subCategory.ref ? dataTemp.subCategoryString.ref :
  //           this.type == dataTemp.subCategory.btn ? dataTemp.subCategoryString.btn : 'Data Tidak Valid';
  // }

  GetTitle() {
    this.title = this.dataParent == dataTemp.tab.triase ? dataTemp.title.triase :
      this.dataParent == dataTemp.tab.surveiPrimer ? dataTemp.title.surveiPrimer :
        this.dataParent == dataTemp.tab.surveiSekunder ? dataTemp.title.surveiSekunder :
          this.dataParent == dataTemp.tab.tandaVital ? dataTemp.title.tandaVital :
            'Master Data';
  }

  // GetType(ev: any) {
  //   this.type = ev.detail.data.action
  //   this.typeString = this.GetTypeString();
  //   this.SetView();
  // }

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
      this.imageCategory = await this.photoService.UploadFile(image, name);
      console.log('this.imageCategory', this.imageCategory);
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
      if (this.imageCategory) {
        if (this.titleAliasCategory) var categoryData: Category = { id: this.id ? +this.id : 0, title: this.titleCategory!, data: this.data!, image: this.imageCategory, titleAlias: this.titleAliasCategory };
        else var categoryData: Category = { id: this.id ? +this.id : 0, title: this.titleCategory!, data: this.data!, image: this.imageCategory };
      }
      else {
        if (this.titleAliasCategory) var categoryData: Category = { id: this.id ? +this.id : 0, title: this.titleCategory!, data: this.data!, titleAlias: this.titleAliasCategory };
        else var categoryData: Category = { id: this.id ? +this.id : 0, title: this.titleCategory!, data: this.data! };
      }

      if (this.IsCreate()) {
        // await this.categoryDataListCollection.add(categoryData);
        await this.categoryDataListCollection.doc(categoryData.data).set(categoryData);
        var msg = "Berhasil menambah data baru";
        await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.editMaster);
      } else {
        await this.categoryDataDoc.update(categoryData);
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
