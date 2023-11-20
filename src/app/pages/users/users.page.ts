import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController, ModalController } from '@ionic/angular';
import { dataTemp } from 'src/app/dataTemp';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { FireUserData, GlobalService } from 'src/app/services/global.service';
import { PhotoService } from 'src/app/services/photo.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { ApprovalComponent } from 'src/app/comp/approval/approval.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  @ViewChild(IonModal) modal: any;

  // header
  title: string | undefined = "Users";
  defaultHref: string | undefined = dataTemp.route.admin;

  // data
  activeFireUsers: FireUserData[] = [];
  inactiveFireUsers: FireUserData[] = [];
  inputs: string = '';
  searchFireUsers: FireUserData[] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';

  // view
  showReview: boolean = true;
  showPengguna: boolean = true;
  isSearch: boolean = false;
  limitButtons = [
    { text: '2', data: { action: 2 } },
    { text: '5', data: { action: 5 } },
    { text: '10', data: { action: 10 } },
    { text: '20', data: { action: 20 } },
    { text: '50', data: { action: 50 } },
    { text: 'Cancel', role: 'cancel', data: { action: undefined } },
  ];
  numbersInactive = Array(2).fill(0).map((x, i) => i);
  numbersActive = Array(10).fill(0).map((x, i) => i);
  isBack: boolean = false;
  isForward: boolean = false;

  constructor(private globalService: GlobalService,
    private photoService: PhotoService,
    private fetchService: FetchService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private modalController: ModalController) {
  }

  async ngOnInit() {
    await this.GetFireUserSummary();
    await this.GetDataReview();
    await this.GetDataPengguna();
  }

  async GetFireUserSummary() {
    try {
      const summary = await this.fetchService.GetFireUserSummary();
      // this.TranslatePhoto(this.inactiveFireUsers);
      console.log('summary', summary);
      console.log('summary.total', summary.total);

    } catch (error: any) {
      var msg = error ? error : "Gagal memuat data";
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
    }
  }

  SetView() {

  }

  async GetDataReview() {
    try {
      this.inactiveFireUsers = await this.fetchService.GetFireUsersLimit(this.limit, this.page, dataTemp.status.inactive);
      // this.TranslatePhoto(this.inactiveFireUsers);
      console.log('this.inactiveFireUsers', this.inactiveFireUsers);

    } catch (error: any) {
      var msg = error ? error : "Gagal memuat data";
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
    }
  }

  async GetDataPengguna() {
    try {
      this.activeFireUsers = await this.fetchService.GetFireUsersLimit(this.limit, this.page, dataTemp.status.active);
      // this.TranslatePhoto(this.activeFireUsers);
      console.log('this.activeFireUsers', this.activeFireUsers);

    } catch (error: any) {
      var msg = error ? error : "Gagal memuat data";
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.fetch);
    }
  }

  ChangeShowReview() {
    this.showReview = this.showReview ? this.showReview = false : true;
  }

  ChangeShowPengguna() {
    this.showPengguna = this.showPengguna ? this.showPengguna = false : true;
  }

  searchInput(event: any) {
    const query = event.target.value.toLowerCase();
    // console.log('Input', query);
    this.inputs = query;
    if (this.inputs.length > 0) this.isSearch = true; else this.isSearch = false;
  }

  async searchChange(event: any) {
    if (!event.target.value) return;

    this.searchFireUsers = [];
    this.query = event.target.value.toLowerCase();
    console.log('Search', this.query);

    await this.Search();
  }

  async Search() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      this.searchFireUsers = await this.fetchService.SearchFireUsersLimit(this.query, this.limit, this.page, dataTemp.status.active);
      // this.TranslatePhoto(this.searchFireUsers);
      console.log('this.searchFireUsers', this.searchFireUsers);
      loading.dismiss();
    } catch (error: any) {
      var msg = error;
      await this.authService.CreateSaveAndShowLog(msg, dataTemp.log.search);
      loading.dismiss();
    }
  }

  private TranslatePhoto(fireUsers: FireUserData[]) {
    fireUsers.forEach((x: any) => {
      x.photo = x.photo ? this.photoService.ConvertPhotoBase64ToImage(x.photo) : 'https://ionicframework.com/docs/img/demos/avatar.svg';
    });
  }

  async LimitChanged(ev: any) {
    if (ev.detail.role == 'cancel' || ev.detail.role == 'backdrop') return;
    console.log(ev.detail.data.action);

    this.activeFireUsers = [];
    this.limit = ev.detail.data.action;
    this.page = 1;

    if (this.isSearch) await this.Search();
    else await this.GetDataPengguna();
  }

  async Approval(x: FireUserData) {
    console.log('x', x);

    const modal = await this.modalController.create({
      component: ApprovalComponent,
      // initialBreakpoint: 0.6,
      // breakpoints: [0, 0.6, 0.8],
      // mode: 'md',
      // cssClass: 'round-modal',
      componentProps: { 'data': x }
    });
    modal.present();
    
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      await this.GetFireUserSummary();
      await this.GetDataReview();
      await this.GetDataPengguna();
      console.log(data);
    } else console.log(data);
  }

  cancel() {
    console.log('keluar');

    this.modal.dismiss(null, 'cancel');
  }

  onWillDismissApproval(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async Approve() {
    console.log('bisa');
    this.modal.dismiss(null, 'confirm');
  }
}
