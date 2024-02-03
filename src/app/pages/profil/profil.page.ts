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
import { Preferences } from '@capacitor/preferences';

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
      var transaction_id = await this.globalService.GetObjFromPreference('transaction_id');
      console.log('hasil get transaction_id dr storage', transaction_id);
      if (transaction_id) {
        var data: any = await this.getTransactionStatus(transaction_id);
        console.log('data getTransactionStatus', data);
        console.log('data getTransactionStatus', data.transaction_status);

        if (data.transaction_status == dataTemp.transaction_status.settlement) {
          // create transaction 
          // create subscription
          // await Preferences.remove({ key: 'transaction_id' });
        }
        else if (data.transaction_status != dataTemp.transaction_status.pending)
          await Preferences.remove({ key: 'transaction_id' });
      }

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

  private async getTransactionStatus(transaction_id: string) {
    const result = this.fetchService.getTransactionStatus(transaction_id);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  async SubsPaket(x: number) {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      var order_id = this.globalService.profile.fire_user_id + this.globalService.GetDate().time;

      var transactionData: transaction = {
        payment_type: dataTemp.payment_type.gopay,
        transaction_details: { order_id: order_id, gross_amount: x == 1 ? 45000 : x == 2 ? 72000 : 120000 },
        item_details: [{ id: x == 1 ? 'subs1' : x == 2 ? 'subs2' : 'subs3', name: x == 1 ? 'Paket 3 Bulan - 45000' : x == 2 ? 'Paket 6 Bulan - 72000' : 'Paket 12 Bulan - 120000', price: x == 1 ? 45000 : x == 2 ? 72000 : 120000, quantity: 1 }],
        customer_details: { first_name: this.globalService.profile.fire_user_id, last_name: this.globalService.profile.nama, email: this.globalService.profile.email, phone: '' },
        gopay: { enable_callback: true, callback_url: 'someapps://callback' }
      };
      console.log('transactionData', transactionData);

      var data: any = await this.charge(transactionData);
      console.log('data', data);
      var deeplinkredirect = data.actions.find((x: any) => x.name == dataTemp.responsActions.deeplinkredirect);
      console.log('deeplinkredirect', deeplinkredirect);

      loading.dismiss();
      window.open(deeplinkredirect.url, '_system', 'location=yes');

      // save transaction_id to storage,
      this.globalService.SaveObjToPreference('transaction_id', data.transaction_id);
      console.log('transaction_id', data.transaction_id);

      // loop get status
    } catch (error: any) {
      loading.dismiss();
      this.globalService.PresentToast(error);
    }
  }
}
