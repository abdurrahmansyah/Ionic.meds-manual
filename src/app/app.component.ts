import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GlobalService, SubscriptionData } from './services/global.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FetchService } from './services/fetch.service';
import { AuthService } from './services/auth.service';
import { dataTemp } from './dataTemp';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isAdmin: boolean = false;
  constructor(public auth: AngularFireAuth,
    private globalService: GlobalService,
    private afs: AngularFirestore,
    private fetchService: FetchService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    this.auth.user.subscribe(async user => {
      if (user !== undefined && user !== null) {
        // var userDataListCollectionSpecificEmail = this.afs.collection<FireUserData>('user', ref => ref.where('email', '==', user.email));
        // var userDataListSpecificEmail = userDataListCollectionSpecificEmail.valueChanges({ idField: 'id' });
        // userDataListSpecificEmail.subscribe(userDataList => {
        //   console.log('userDataList', userDataList);
        //   if (userDataList.length > 0) {
        //     var userData = userDataList.find(x => x);
        //     console.log('userData1', userData);
        //     if (userData !== undefined) {
        //       console.log('userData2', userData);

        //       this.isAdmin = userData.isAdmin;
        //     } else console.log("BUG: User Data Kosong");
        //   } else this.isAdmin = false;
        // });

        this.globalService.profile = await this.globalService.GetProfileFromPreference();
        console.log('bzzz', this.globalService.profile);
        const member: SubscriptionData = await this.fetchService.CheckIsMember(this.globalService.profile.fire_user_id);
        this.globalService.isMember = member ? true : false;
        this.globalService.subscriptionData = member ? member : new SubscriptionData();
        console.log('this.globalService.subscriptionData', this.globalService.subscriptionData);
        console.log('this.globalService.isMember', this.globalService.isMember);

        this.globalService.profile = await this.fetchService.GetUserProfile();
      }
      this.globalService.isMasterLoad = true;
      console.log('this.globalService.isMasterLoad', this.globalService.isMasterLoad);
    });
  }
}
