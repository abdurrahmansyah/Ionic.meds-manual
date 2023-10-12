import { Injectable, inject } from '@angular/core';
import { Auth, User, user, createUserWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GlobalService, LogData, UserData } from './global.service';
import { FirebaseService } from './firebase.service';
import { dataTemp } from '../dataTemp';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FetchService } from './fetch.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription;
  email: string | undefined;
  oldEmail: string | undefined;

  private userDataDoc: AngularFirestoreDocument<UserData>;

  constructor(private router: Router,
    public authFireCompat: AngularFireAuth,
    private globalService: GlobalService,
    private firebaseService: FirebaseService,
    private fetchService: FetchService,
    private storageFireCompat: AngularFireStorage,
    private afs: AngularFirestore) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.email = aUser?.email!;
      this.oldEmail = this.email;
    })

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.email = user.email!;
        console.log("Log: Authenticated user session");
      } else {
        this.email = this.oldEmail;
        console.log("Log: Not authenticated user session");
      }
    });

    this.userDataDoc = this.afs.doc<UserData>(`user/${this.email}`);
  }

  async Register(email: string, password: string, nama: string, tglLahir: string, profesi: string, lampiran: string, photo: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      var userData: UserData = { email: this.email!, nama: nama, tglLahir: tglLahir, profesi: profesi, lampiran: lampiran, photo: photo, isAdmin: false };
      await this.firebaseService.userDataListCollection.doc(userData.email).set(userData);
      var msg = "Register Berhasil";
      await this.CreateSaveAndShowLog(msg, dataTemp.log.register);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      var errorMessage = this.GetEror(error.code, error.message);
      var msg = "Register Gagal: " + errorMessage;
      if (email) await this.CreateSaveAndShowLog(msg, dataTemp.log.register);
      else await this.CreateSaveAndShowLog(msg, dataTemp.log.register, true);
    }
  }

  async RegisterWithDBWP(email: string, password: string, nama: string, tglLahir: string, profesi: string, lampiran: string, photo?: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      var userData: UserData = photo ? { email: email, nama: nama, tglLahir: tglLahir, profesi: profesi, lampiran: lampiran, photo: photo, isAdmin: false } :
        { email: email, nama: nama, tglLahir: tglLahir, profesi: profesi, lampiran: lampiran, isAdmin: false };
      var isCreateSuccess: any = await this.CreateFireUser(userData);

      console.log('isCreateSuccess', isCreateSuccess);
      if (isCreateSuccess.status == 'failed') throw ('Tidak berhasil membuat akun baru');
      // await this.firebaseService.userDataListCollection.doc(userData.email).set(userData);

      var msg = "Register Berhasil";
      await this.CreateSaveAndShowLog(msg, dataTemp.log.register);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      var errorMessage = this.GetEror(error.code, error.message);
      var msg = "Register Gagal: " + errorMessage;
      if (email) await this.CreateSaveAndShowLog(msg, dataTemp.log.register);
      else await this.CreateSaveAndShowLog(msg, dataTemp.log.register, true);
    }
  }

  private async CreateFireUser(userData: UserData) {
    const result = this.fetchService.CreateFireUser(userData);
    return await new Promise(resolve => {
      result.pipe(take(1)).subscribe((data: any) => { resolve(data) });
    });
  }

  async UpdateUser(nama: string, tglLahir: string, profesi: string, photo: string) {
    console.log('currentUser', this.user$);

    // try {
    //   public email: string = '';
    //   public nama: string = '';
    //   public tglLahir: string = '';
    //   public profesi: string = '';
    //   public lampiran: string = '';
    //   public photo: string = '';
    //   public isAdmin: boolean = false;

    //   var userData: UserData = { email: this.email!, nama: nama,  };
    //   await this.userDataDoc.update(userData);

    //   await createUserWithEmailAndPassword(this.auth, email, password);
    //   var userData: UserData = { email: this.email!, nama: nama, tglLahir: tglLahir, profesi: profesi, lampiran: lampiran, photo: photo, isAdmin: false };
    //   await this.firebaseService.userDataListCollection.doc(userData.email).set(userData);
    //   var msg = "Register Berhasil";
    //   await this.CreateSaveAndShowLog(msg, dataTemp.log.register);
    //   this.router.navigateByUrl('/tabs', { replaceUrl: true });
    // } catch (error: any) {
    //   var errorMessage = this.GetEror(error.code, error.message);
    //   var msg = "Register Gagal: " + errorMessage;
    //   if (email) await this.CreateSaveAndShowLog(msg, dataTemp.log.register);
    //   else await this.CreateSaveAndShowLog(msg, dataTemp.log.register, true);
    // }
  }

  async Login(email: string, password: string) {
    try {
      await this.authFireCompat.signInWithEmailAndPassword(email, password);
      var msg = "Login Berhasil";
      await this.CreateSaveAndShowLog(msg, dataTemp.log.login);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      var errorMessage = this.GetEror(error.code, error.message);
      var msg = "Login Gagal: " + errorMessage;
      // console.log('Log:', msg);
      if (email) await this.CreateSaveAndShowLog(msg, dataTemp.log.login);
      else await this.CreateSaveAndShowLog(msg, dataTemp.log.login, true);
      this.globalService.PresentToast(errorMessage);
    };
  }

  async Logout() {
    try {
      await this.auth.signOut();
      var msg = "Logout Berhasil";
      await this.CreateSaveAndShowLog(msg, dataTemp.log.logout);
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } catch (error: any) {
      var errorMessage = this.GetEror(error.code, error.message);
      var msg = "Logout Gagal: " + errorMessage;
      await this.CreateSaveAndShowLog(msg, dataTemp.log.logout);
    }
  }

  async CreateSaveAndShowLog(msg: string, log: string, isNotSaveLog?: boolean) {
    console.log('Log:', msg);
    if (!isNotSaveLog) await this.SaveLog(log, msg);
    this.globalService.PresentToast(msg);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async SaveLog(log: string, logDetail: string, email?: string) {
    var logData: LogData = { email: email ? email : this.email!, log: log, logDetail: logDetail, dateTime: this.globalService.GetDate().todayDateTimeFormatted };
    await this.firebaseService.logDataListCollection.add(logData);
  }

  GetEror(errCode: string, errMsg: string): string {
    if (errCode == 'auth/too-many-requests') return 'Permintaan masuk terlalu banyak! Silahkan coba beberapa saat lagi';
    if (errCode == 'auth/uid-already-exists') return 'uid yang diberikan sudah digunakan oleh pengguna yang sudah ada';
    if (errCode == 'auth/unauthorized-continue-uri') return 'Domain URL tidak diizinkan';
    if (errCode == 'auth/invalid-email') return 'Format email tidak valid';
    if (errCode == 'auth/user-not-found') return 'Email tidak ditemukan';
    if (errCode == 'auth/email-already-exists') return 'Email telah digunakan';
    if (errCode == 'auth/id-token-expired') return 'Akun bermasalah! Silahkan hubungi admin (#0001)';
    if (errCode == 'auth/id-token-revoked') return 'Akun bermasalah! Silahkan hubungi admin (#0002)';
    if (errCode == 'auth/insufficient-permission') return 'Akun bermasalah! Silahkan hubungi admin (#0003)';
    if (errCode == 'auth/internal-error') return 'Server eror! Silahkan coba beberapa saat lagi (#A001)';
    if (errCode == 'auth/invalid-argument') return 'Server eror! Silahkan coba beberapa saat lagi (#A002)';
    if (errCode == 'auth/invalid-claims') return 'Server eror! Silahkan coba beberapa saat lagi (#A003)';
    if (errCode == 'auth/invalid-continue-uri') return 'Server eror! Silahkan coba beberapa saat lagi (#A004)';
    if (errCode == 'auth/invalid-creation-time') return 'Server eror! Silahkan coba beberapa saat lagi (#A005)';
    if (errCode == 'auth/invalid-credential') return 'Akun bermasalah! Silahkan hubungi admin (#0004)';
    if (errCode == 'auth/invalid-email-verified	') return 'Format email tidak valid';
    if (errCode == 'auth/invalid-id-token') return 'Akun bermasalah! Silahkan hubungi admin (#0005)';
    if (errCode == 'auth/invalid-password') return 'Password salah! Minimal 6 karakter';
    if (errCode == 'auth/session-cookie-expired') return 'Sesi telah habis! Silahkan coba lagi';
    if (errCode == 'auth/session-cookie-revoked') return 'Sesi telah habis! Silahkan coba lagi';
    if (errCode == 'auth/missing-password') return 'Password tidak boleh kosong';
    if (errCode == 'auth/wrong-password') return 'Password salah! Minimal 6 karakter';
    if (errCode == 'auth/email-already-in-use') return 'Email sudah terdaftar';
    if (errCode == 'auth/network-request-failed') return 'Koneksi Bermasalah! Silahkan coba beberapa saat lagi (#C001)';
    if (errCode == 'invalid-argument') return 'Koneksi Bermasalah! Silahkan coba beberapa saat lagi (#C002)';
    if (errCode == 'auth') return 'ERROR: BUG';
    else return errMsg;
  }
}
