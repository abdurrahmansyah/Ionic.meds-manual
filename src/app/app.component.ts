import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireUserData, GlobalService } from './services/global.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FetchService } from './services/fetch.service';
import { AuthService } from './services/auth.service';

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
        var userDataListCollectionSpecificEmail = this.afs.collection<FireUserData>('user', ref => ref.where('email', '==', user.email));
        var userDataListSpecificEmail = userDataListCollectionSpecificEmail.valueChanges({ idField: 'id' });
        userDataListSpecificEmail.subscribe(userDataList => {
          if (userDataList.length > 0) {
            var userData = userDataList.find(x => x);
            if (userData !== undefined) {
              this.isAdmin = userData.isAdmin;
            } else console.log("BUG: User Data Kosong");
          } else this.isAdmin = false;
        });

        const profile: FireUserData = await this.fetchService.GetUserProfile();
        this.globalService.profile = profile;
      }
    });
  }
}
