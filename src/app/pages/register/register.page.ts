import { Component, OnInit, ViewChild } from '@angular/core';
import { uploadString } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController, IonInput, LoadingController, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  readonly tglLahirMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  email: string = '';
  password: string = '';
  nama: string = '';
  tglLahir: string = '';
  profesi: string = '';
  lampiran: Photo | undefined;
  lampiranString: string = '';
  photoImg: any;
  photo: any;
  profile: any;
  iconIAgree: string = 'square-outline';
  @ViewChild('ionInputElName', { static: true }) ionInputElName!: IonInput;

  constructor(private router: Router,
    public activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private globalService: GlobalService,
    private authService: AuthService,
    private photoService: PhotoService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.GetExtras();
  }

  private GetExtras() {
    this.activatedRoute.queryParams.subscribe(params => {
      var nav = this.router.getCurrentNavigation();
      if (nav != null || nav != undefined) {
        if (nav.extras.state) {
          this.email = nav.extras.state['emailLog'];
        }
      }
    });
  }

  onInputName(ev: any) {
    const value = ev.target!.value;
    // const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    const filteredValue = value.replace(/[^a-zA-Z ]+/g, '');
    this.ionInputElName.value = this.nama = filteredValue;
  }

  onChangeTglLahir() {
    if (isNaN(new Date(this.tglLahir).valueOf()) || new Date(this.tglLahir).valueOf() > new Date().valueOf()) {
      this.PresentToast('Tanggal lahir tidak valid!');
      this.tglLahir = '';
      return;
    }
  }

  async ChangeImage() {
    try {
      const photo = await this.photoService.ChooseFromGallery();
      this.photo = this.photoService.ConvertPhotoBase64ToImage(photo.base64String);
    } catch (error) {
      this.globalService.PresentToast('Gagal memuat foto! Coba lagi');
    }
  }

  async EditLampiran() {
    try {
      this.lampiran = await this.photoService.ChooseFromGallery();
      // const name = 'lampiran_' + (Math.random() + 1).toString(36).substring(5);
      // this.lampiranString = name + '.png';
      // this.lampiran = await this.photoService.UploadFile(image, name);
      // console.log('this.lampiran', this.lampiran);
      // if (this.lampiran == '') throw ('Gagal memuat foto! Coba lagi'); else loading.dismiss();
    } catch (error: any) {
      this.globalService.PresentToast('Gagal memuat foto! Coba lagi');
    }
  }

  private async PresentToast(message: string) {
    const alert = await this.toastController.create({ message: message, duration: 1500 });
    await alert.present();
  }

  async RegisterWithFirebase() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      this.ValidateData();
      let r = (Math.random() + 1).toString(36).substring(3);
      const nameProfil = this.email ? this.email + '_' + this.globalService.GetDate().todayDateTimeFormatted : 'profil_' + r;
      const nameLampiran = 'lampiran_' + (Math.random() + 1).toString(36).substring(5);
      var photo = this.photo ? await this.photoService.UploadFile(this.photo!, nameProfil) : '';
      var lampiran = await this.photoService.UploadFile(this.lampiran!, nameLampiran);
      this.email = this.email.toLowerCase();
      await this.authService.RegisterWithFirebase(this.email, this.password, this.nama, this.tglLahir, this.profesi, lampiran, dataTemp.status.inactive, photo);
      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.globalService.PresentToast(error);
    }
  }

  async RegisterWithDBWP() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      this.ValidateData();

      await this.authService.RegisterWithDBWP(this.email, this.password, this.nama, this.tglLahir, this.profesi, this.lampiran!.base64String!, dataTemp.status.inactive, this.photo);
      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.globalService.PresentToast(error);
    }
  }

  ValidateData() {
    if (!this.email) throw ('Email tidak boleh kosong!'); else this.email = this.email.toLowerCase();
    if (!this.password) throw ('Password tidak boleh kosong!');
    if (!this.nama) throw ('Nama tidak boleh kosong!');
    if (!this.tglLahir) throw ('Tanggal Lahir tidak boleh kosong!');
    if (!this.profesi) throw ('Profesi tidak boleh kosong!');
    if (!this.lampiran) throw ('Foto Ijazah/STR/Kartu Mahasiswa tidak boleh kosong!');
    if (!this.photo) this.photo = dataTemp.master.photo;
    if (this.iconIAgree == 'square-outline') throw ('Silahkan menyetujui Syarat dan Ketentuan');
  }

  Login() {
    let navigationExtras: NavigationExtras = {
      state: {
        emailLog: this.email
      }
    }
    this.router.navigate(['login'], navigationExtras);
    // this.router.navigateByUrl('/register', { replaceUrl: false });
  }

  public toggleIAgree() {
    if (this.iconIAgree == 'checkbox-outline') this.iconIAgree = 'square-outline';
    else this.iconIAgree = 'checkbox-outline';
  }
}
