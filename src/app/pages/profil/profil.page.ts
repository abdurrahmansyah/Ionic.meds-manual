import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { IonInput, IonModal, LoadingController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { FireUserData, GlobalService } from 'src/app/services/global.service';
import { PhotoService } from 'src/app/services/photo.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { MidtransService, transaction, transaction_details } from 'src/app/services/midtrans.service';
import { take, timestamp } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  @ViewChild(IonModal) modal: any;
  isMember: boolean = false;
  isSubsActive: boolean = false;

  profile: any = { email: undefined, nama: undefined, tglLahir: undefined, profesi: undefined, photo: undefined, status: undefined, isAdmin: false };

  readonly tglLahirMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  @ViewChild('ionInputElName', { static: true }) ionInputElName!: IonInput;

  constructor(private globalService: GlobalService,
    private authService: AuthService,
    private router: Router,
    private photoService: PhotoService,
    private fetchService: FetchService,
    private midtransService: MidtransService,
    private loadingController: LoadingController) {
  }

  async ngOnInit() {
    try {
      this.profile = this.globalService.profile;
      if (this.profile.photo == undefined) this.profile = await this.globalService.GetProfileFromPreference();
      this.profile = await this.fetchService.GetUserProfile();
    } catch (error: any) {
      var msg = error ? error : "Gagal memuat data";
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
    }
  }

  Logout() { this.authService.Logout(); }

  Admin() { this.router.navigate(['/tabs/profil/admin']); }

  async ChangeImage() {
    try {
      const photo = await this.photoService.ChooseFromGallery();
      this.profile.photo = this.photoService.ConvertPhotoBase64ToImage(photo.base64String);
    } catch (error) {
      this.globalService.PresentToast('Gagal memuat foto! Coba lagi');
    }
  }

  async UpdatePassword() {
    await this.authService.ResetPassword();
    // const modal = await this.modalController.create({
    //   component: PasswordComponent
    // });
    // return await modal.present();
  }

  ////////////////////////////////////////////////////////////////

  onInputName(ev: any) {
    const value = ev.target!.value;
    // const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    const filteredValue = value.replace(/[^a-zA-Z ]+/g, '');
    this.ionInputElName.value = this.profile.nama = filteredValue;
  }

  onChangeTglLahir() {
    if (isNaN(new Date(this.profile.tglLahir).valueOf()) || new Date(this.profile.tglLahir).valueOf() > new Date().valueOf()) {
      this.globalService.PresentToast('Tanggal lahir tidak valid!');
      this.profile.tglLahir = '';
      return;
    }
  }

  ////////////////////////////////////////////////////////////////

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async Update() {
    // this.modal.dismiss(this.name, 'confirm');
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      this.ValidateData();

      await this.authService.UpdateProfile(this.profile.email, this.profile.nama, this.profile.tglLahir, this.profile.profesi, this.profile.photo);
      this.modal.dismiss(null, 'confirm');

      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.globalService.PresentToast(error);
    }
  }

  ValidateData() {
    if (!this.profile.email) throw ('Email tidak boleh kosong!'); else this.profile.email = this.profile.email.toLowerCase();
    if (!this.profile.nama) throw ('Nama tidak boleh kosong!');
    if (!this.profile.tglLahir) throw ('Tanggal Lahir tidak boleh kosong!');
    if (!this.profile.profesi) throw ('Profesi tidak boleh kosong!');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async Subs() {
    this.isSubsActive = true;
    // var transactionData: transaction = { transaction_details: { order_id: 'Rdev.001', gross_amount: 1000 }, credit_card: { secure: true } };
    // console.log('transactionData', transactionData);

    // var data: any = await this.snapTransactions(transactionData);
    // console.log('data', data);

    // this.midtransService.snapTransactions
  }

  async SubsClicked() {
    this.isSubsActive = this.isSubsActive == true ? false : true;
  }

  private async snapTransactions(transactionData: transaction) {
    const result = this.midtransService.snapTransactions(transactionData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  private async charge(transactionData: transaction) {
    const result = this.fetchService.charge(transactionData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  async SubsPaket1() {
    console.log('klik paket 1');

    var transactionData: transaction = { transaction_details: { order_id: 'Rdev.002' + timestamp, gross_amount: 1000 }, credit_card: { secure: true } };
    console.log('transactionData', transactionData);

    var data: any = await this.charge(transactionData);
    console.log('data', data);
    var deeplinkredirect = data.actions.find((x: any) => x.name == dataTemp.responsActions.deeplinkredirect);
    console.log('deeplinkredirect', deeplinkredirect);

    window.open(deeplinkredirect.url, '_system', 'location=yes')
  }
}
