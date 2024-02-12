import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { IonInput, IonModal, LoadingController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { FireUserData, GlobalService, TransactionData } from 'src/app/services/global.service';
import { PhotoService } from 'src/app/services/photo.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { MidtransService, charge, transaction_details } from 'src/app/services/midtrans.service';
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
  transaction_id: any = null;

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
      console.log('profil pertama', this.profile);

      if (this.profile.photo == undefined) this.profile = await this.globalService.GetProfileFromPreference();
      this.profile = await this.fetchService.GetUserProfile();

      this.transaction_id = (await Preferences.get({ key: dataTemp.keyStrg.transaction_id })).value;
      console.log('this.transaction_id', this.transaction_id);

      await this.LoopStatus();
    } catch (error: any) {
      var msg = error ? error : "Gagal memuat data";
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
    }
  }

 async LoopStatus(){
    while (this.transaction_id !== null) {
      var statusResult: any = await this.status(this.transaction_id, this.globalService.isProduction);
      console.log('statusResult', statusResult);

      if (statusResult.transaction_status != dataTemp.transaction_status.pending) {
        const transactionData: TransactionData = {
          transaction_id: statusResult.transaction_id,
          order_id: statusResult.order_id,
          fire_user_id: statusResult.metadata.fire_user_id,
          gross_amount: statusResult.gross_amount,
          payment_type: statusResult.payment_type,
          transaction_time: statusResult.transaction_time,
          transaction_status: statusResult.transaction_status,
          expiry_time: statusResult.expiry_time,
          settlement_time: statusResult.transaction_status == dataTemp.transaction_status.settlement ? statusResult.settlement_time : '0000-00-00 00:00:00'
        };

        var updateTransactionResult: any = await this.UpdateTransaction(transactionData);
        console.log('updateTransactionResult', updateTransactionResult);
        await Preferences.remove({ key: dataTemp.keyStrg.transaction_id });
        this.transaction_id = null;
      }
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

  async Subs() { this.isSubsActive = true }

  async SubsClicked() { this.isSubsActive = this.isSubsActive == true ? false : true }

  async SubsPaket(x: number) {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      var order_id = this.globalService.profile.fire_user_id + this.globalService.GetDate().time;
      const gross_amount = x == 1 ? 45000 : x == 2 ? 72000 : 120000;
      const item_id = x == 1 ? 'subs1' : x == 2 ? 'subs2' : 'subs3';
      const item_name = x == 1 ? 'Paket 3 Bulan - 45000' : x == 2 ? 'Paket 6 Bulan - 72000' : 'Paket 12 Bulan - 120000';

      var chargeData: charge = {
        payment_type: dataTemp.payment_type.gopay,
        transaction_details: { order_id: order_id, gross_amount: gross_amount },
        item_details: [{ id: item_id, name: item_name, price: gross_amount, quantity: 1 }],
        customer_details: { first_name: this.globalService.profile.fire_user_id, last_name: this.globalService.profile.nama, email: this.globalService.profile.email, phone: '' },
        gopay: { enable_callback: true, callback_url: 'https://medsmanual.com/wp-json/api/callback/' + order_id + '!' + this.globalService.isProduction },
        metadata: { fire_user_id: this.globalService.profile.fire_user_id, paket: x.toString() },
        production: this.globalService.isProduction
      };
      console.log('chargeData', chargeData);

      var chargeResult: any = await this.charge(chargeData);
      console.log('chargeResult', chargeResult);

      if (chargeResult.status == 'failed') {
        await this.authService.SaveLog(dataTemp.log.charge, dataTemp.logMessage.failed);
        throw (dataTemp.log.charge);
      } else await this.authService.SaveLog(dataTemp.log.charge, dataTemp.logMessage.success);

      var deeplinkredirect = chargeResult.actions.find((x: any) => x.name == dataTemp.responsActions.deeplinkredirect);
      console.log('deeplinkredirect', deeplinkredirect);

      //create transaction
      const transactionData: TransactionData = {
        transaction_id: chargeResult.transaction_id,
        order_id: order_id,
        fire_user_id: this.globalService.profile.fire_user_id,
        gross_amount: gross_amount,
        payment_type: chargeResult.payment_type,
        transaction_time: chargeResult.transaction_time,
        transaction_status: chargeResult.transaction_status,
        expiry_time: chargeResult.expiry_time
      };

      var createTransactionResult: any = await this.CreateTransaction(transactionData);
      console.log('createTransactionResult', createTransactionResult);

      if (createTransactionResult.status == 'failed') {
        await this.authService.SaveLog(dataTemp.log.createTransaction, dataTemp.logMessage.failed);
        throw (dataTemp.log.createTransaction);
      } else await this.authService.SaveLog(dataTemp.log.createTransaction, dataTemp.logMessage.success);

      await Preferences.set({ key: dataTemp.keyStrg.transaction_id, value: chargeResult.transaction_id });

      loading.dismiss();
      window.open(deeplinkredirect.url, '_system', 'location=yes');

      this.transaction_id = chargeResult.transaction_id;
      await this.LoopStatus();
    } catch (error: any) {
      console.log('error', error);
      console.log('error.message', error.message);
      
      const msg = error == dataTemp.log.charge ? 'Gagal melakukan proses charge transaksi' :
        error == dataTemp.log.createTransaction ? 'Gagal membuat data transaksi' : '';
      loading.dismiss();
      this.globalService.PresentToast(msg == '' ? error.message : msg);
    }
  }

  // async GetTransactionIdFromStorage(){
  //   this.transaction_id = await Preferences.get({ key: dataTemp.keyStrg.transaction_id });
  //   console.log('this.transaction_id', this.transaction_id);
  // }

  private async charge(chargeData: charge) {
    const result = this.fetchService.charge(chargeData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  private async status(transaction_id: string, production: boolean) {
    const result = this.fetchService.status(transaction_id, production);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  private async CreateTransaction(transactionData: TransactionData) {
    const result = this.fetchService.createTransaction(transactionData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  private async UpdateTransaction(transactionData: TransactionData) {
    const result = this.fetchService.updateTransaction(transactionData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

}
