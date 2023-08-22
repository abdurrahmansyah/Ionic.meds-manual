import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GlobalService, UserData } from './services/global.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isAdmin: boolean = false;
  constructor(public auth: AngularFireAuth,
    private globalService: GlobalService,
    private afs: AngularFirestore) {
    this.auth.user.subscribe(user => {
      if (user !== undefined && user !== null) {
        var userDataListCollectionSpecificEmail = this.afs.collection<UserData>('user', ref => ref.where('email', '==', user.email));
        var userDataListSpecificEmail = userDataListCollectionSpecificEmail.valueChanges({ idField: 'id' });
        userDataListSpecificEmail.subscribe(userDataList => {
          if (userDataList.length > 0) {
            var userData = userDataList.find(x => x);
            if (userData !== undefined) {
              this.isAdmin = userData.isAdmin;
            } else console.log("BUG: User Data Kosong");
          } else this.isAdmin = false;
        });
      }
    });
  }
}
