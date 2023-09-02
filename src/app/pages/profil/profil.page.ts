import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
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

  constructor(private globalService: GlobalService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private photoService: PhotoService,
    private loadingController: LoadingController) {
    this.photoService.getUserProfile().subscribe((data) => {
      this.profile = data;
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

  async changeImage() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90,
      saveToGallery: true,
      allowEditing: false
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.photoService.uploadImage(image);
      loading.dismiss()

      if (!result) {
        this.globalService.PresentAlert('There was problem uploading your Avatar');
      }
    }
    // return image;
  }
}
