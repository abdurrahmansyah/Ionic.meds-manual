import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FireUserData, GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent implements OnInit {
  profile: FireUserData = new FireUserData();

  constructor(private modalCtrl: ModalController,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private authService: AuthService,
    private globalService: GlobalService) { }

  ngOnInit() {
    this.profile = this.navParams.get('data');
  }

  cancel() {
    console.log('keluar');

    this.modalCtrl.dismiss('keluar aja', 'cancel');
  }

  async Approve() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      this.profile.status = dataTemp.status.active;
      await this.authService.UpdateFireUser(this.profile);
      loading.dismiss();
      this.modalCtrl.dismiss('bisaa', 'confirm');
    } catch (error: any) {
      loading.dismiss();
      this.globalService.PresentToast(error);
    }
  }
}
