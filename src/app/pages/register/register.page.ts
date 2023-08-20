import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

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
  iconIAgree: string = 'square-outline';

  constructor(private router: Router,
    public activatedRoute: ActivatedRoute, private alertController: AlertController) { }

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

  Login() {
    let navigationExtras: NavigationExtras = {
      state: {
        emailLog: this.email
      }
    }
    this.router.navigate(['login'], navigationExtras);

    // this.router.navigateByUrl('/register', { replaceUrl: false });
  }

  public async TermAndCond(message = 'alert') {
    const alert = await this.alertController.create({
      header: '<h3>Pemberitahuan</h3><p>' + message + '</p>',
      // cssClass: 'globalMessage',
      message:
        '<div>Icon<ion-icon name="calculator"></ion-icon></div>',
      backdropDismiss: true,
      buttons: [{
        text: 'Tutup',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }
      ]
    });
    await alert.present();
  }

  public toggleIAgree() {
    if (this.iconIAgree == 'checkbox-outline') this.iconIAgree = 'square-outline';
    else this.iconIAgree = 'checkbox-outline';
  }
}
