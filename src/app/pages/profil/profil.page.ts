import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService, UserData } from 'src/app/services/global.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  photo: any;
  photoString: string = '';
  profile: any;

  readonly tglLahirMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  email: string = '';
  // password: string = '';
  nama: string = '';
  tglLahir: string = '';
  profesi: string = '';
  photoImg: any;
  @ViewChild('ionInputElName', { static: true }) ionInputElName!: IonInput;

  constructor(private globalService: GlobalService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private photoService: PhotoService,
    private loadingController: LoadingController) {
    this.photoService.getUserProfile().subscribe((data) => {
      this.profile = data;
      this.email = data['email'];
      this.nama = data['nama'];
      this.tglLahir = data['tglLahir'];
      this.profesi = data['profesi'];

      console.log('profile', this.profile);
      console.log('email', this.email);
      
    })
  }

  ngOnInit() {
  }

  Logout() {
    this.authService.Logout();
  }

  Admin() { this.router.navigate(['/tabs/profil/admin']); }

  public async TakeAPhoto() {
    this.alertController.create({
      mode: 'ios',
      message: 'Pastikan gambar jelas dan memiliki resolusi tinggi!',
      cssClass: 'alert-akun',
      buttons: [{
        text: 'Batal',
        role: 'Cancel'
      }, {
        text: 'Lanjut',
        handler: async () => {
          const image = await this.photoService.TakeAPhoto();
          console.log('image', image);
          this.photo = this.photoService.ConvertPhotoBase64ToImage(image.base64String);

          // var dateData = this.globalService.GetDate()
          // var name = this.datePipe.transform(dateData.date, 'yyyy-MM-dd') + " " + this.globalService.userData.md_user_name + "." + this.image.format;
          console.log('image.base64String', image.base64String);

          // this.credentials.controls['ktp_data'].setValue(image.base64String);
        }
      }]
    }).then(alert => {
      return alert.present();
    });
  }

  async ChangeImage() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      // this.photo = await this.photoService.TakeAPhoto();
      // // this.photoImg = this.photoService.ConvertPhotoBase64ToImage(this.photo.base64String);

      // let r = (Math.random() + 1).toString(36).substring(3);
      // var name = this.email ? this.email + '_' + this.globalService.GetDate().todayDateTimeFormatted : r;
      // var photo = this.photo ? await this.photoService.UploadFile(this.photo!, name) : '';
      await this.authService.UpdateUser(this.nama, this.tglLahir, this.profesi, 'photo');

      loading.dismiss()
    } catch (error) {
      loading.dismiss();
      this.globalService.PresentToast('Gagal memuat foto! Coba lagi');
    }
  }

  ////////////////////////////////////////////////////////////////

  onInputName(ev: any) {
    const value = ev.target!.value;
    // const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    const filteredValue = value.replace(/[^a-zA-Z ]+/g, '');
    this.ionInputElName.value = this.nama = filteredValue;
  }

  onChangeTglLahir() {
    if (isNaN(new Date(this.tglLahir).valueOf()) || new Date(this.tglLahir).valueOf() > new Date().valueOf()) {
      this.globalService.PresentToast('Tanggal lahir tidak valid!');
      this.tglLahir = '';
      return;
    }
  }

}
