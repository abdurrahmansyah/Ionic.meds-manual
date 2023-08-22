import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, IonInput, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

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
  lampiran: string = '';
  photo: string = '';
  iconIAgree: string = 'square-outline';
  @ViewChild('ionInputElName', { static: true }) ionInputElName!: IonInput;

  constructor(private router: Router,
    public activatedRoute: ActivatedRoute, 
    private alertController: AlertController, 
    private toastController: ToastController,
    private globalService: GlobalService,
    private authService: AuthService) { }

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

  private async PresentToast(message: string) {
    const alert = await this.toastController.create({ message: message, duration: 1500 });
    await alert.present();
  }

  Register() {
    if (this.iconIAgree == 'checkbox-outline') {
      this.email = this.email.toLowerCase();
      this.authService.Register(this.email, this.password, this.nama, this.tglLahir, this.profesi, this.lampiran, this.photo);
    }
    else this.globalService.PresentToast("Silahkan menyetujui Syarat dan Ketentuan");
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
