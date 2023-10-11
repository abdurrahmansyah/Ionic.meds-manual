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
  selector: 'app-create-edit-master-two',
  templateUrl: './create-edit-master-two.page.html',
  styleUrls: ['./create-edit-master-two.page.scss'],
})
export class CreateEditMasterTwoPage implements OnInit {
  //Nav Data
  aksi: string | undefined;
  dataParent: Category | undefined;
  param: SubCategory | undefined;
  lastNumber: number = 0;

  // datas: Category[] = [];
  title: string | undefined;
  private subCategoryDataDoc: AngularFirestoreDocument<SubCategory>;
  private subCategoryDataListCollection: AngularFirestoreCollection<SubCategory>;

  // Model Data
  id: number = 0;
  type: string = dataTemp.subCategory.text;
  typeString: string = '';
  data: string | undefined;
  titleBtn: string | undefined;
  titleAliasBtn: string | undefined;
  imageBtn: string | undefined;
  bagianBtn: string | undefined = '';//'dataTemp.bagian.asesmen';
  isImg: boolean = false;
  isBtn: boolean = false;
  isAudio: boolean = false;

  public actionSheetButtons = [
    { text: dataTemp.subCategoryString.text, data: { action: dataTemp.subCategory.text }, },
    { text: dataTemp.subCategoryString.sub, data: { action: dataTemp.subCategory.sub }, },
    { text: dataTemp.subCategoryString.subsub, data: { action: dataTemp.subCategory.subsub }, },
    { text: dataTemp.subCategoryString.img, data: { action: dataTemp.subCategory.img }, },
    { text: dataTemp.subCategoryString.ref, data: { action: dataTemp.subCategory.ref }, },
    { text: dataTemp.subCategoryString.btn, data: { action: dataTemp.subCategory.btn }, },
    { text: dataTemp.subCategoryString.audio, data: { action: dataTemp.subCategory.audio }, },
    { text: 'Cancel', role: 'cancel', data: { action: 'cancel', }, },
  ];

  public actionSheetAudioButtons = [
    { text: dataTemp.audio.auskultasiNormalVesikuler, data: { action: dataTemp.audio.auskultasiNormalVesikuler }, },
    { text: dataTemp.audio.crackles, data: { action: dataTemp.audio.crackles }, },
    { text: dataTemp.audio.pleuralRub, data: { action: dataTemp.audio.pleuralRub }, },
    { text: dataTemp.audio.stridor, data: { action: dataTemp.audio.stridor }, },
    { text: dataTemp.audio.wheezing, data: { action: dataTemp.audio.wheezing }, },
    { text: dataTemp.audio.suaraJantungNormal, data: { action: dataTemp.audio.suaraJantungNormal }, },
    { text: dataTemp.audio.suaraS3, data: { action: dataTemp.audio.suaraS3 }, },
    { text: dataTemp.audio.suaraS4, data: { action: dataTemp.audio.suaraS4 }, },
    { text: dataTemp.audio.murmurBenign, data: { action: dataTemp.audio.murmurBenign }, },
    { text: dataTemp.audio.lateArterialStenosis, data: { action: dataTemp.audio.lateArterialStenosis }, },
    { text: dataTemp.audio.pulmonicStenosis, data: { action: dataTemp.audio.pulmonicStenosis }, },
    { text: dataTemp.audio.mitralRegurgitation, data: { action: dataTemp.audio.mitralRegurgitation }, },
    { text: dataTemp.audio.patentDuctusArteriosus, data: { action: dataTemp.audio.patentDuctusArteriosus }, },
    { text: dataTemp.audio.ventricularSeptalDefect, data: { action: dataTemp.audio.ventricularSeptalDefect }, },
    { text: dataTemp.audio.atrialSeptalDefect, data: { action: dataTemp.audio.atrialSeptalDefect }, },
    { text: dataTemp.audio.aorticRegurgitation, data: { action: dataTemp.audio.aorticRegurgitation }, },
    { text: dataTemp.audio.mitralStenosis, data: { action: dataTemp.audio.mitralStenosis }, },
    { text: 'Cancel', role: 'cancel', data: { action: 'cancel', }, },
  ];

  public actionSheetBagianButtons = [
    { text: dataTemp.bagian.asesmen, data: { action: dataTemp.bagian.asesmen }, },
    { text: dataTemp.bagian.penunjang, data: { action: dataTemp.bagian.penunjang }, },
    { text: dataTemp.bagian.panduan, data: { action: dataTemp.bagian.panduan }, },
    { text: dataTemp.bagian.obat, data: { action: dataTemp.bagian.obat }, },
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
    this.type = ev.detail.data.action
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

      if (this.IsCreate()) {
        console.log('subCategoryData utk dipost', subCategoryData);

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
}