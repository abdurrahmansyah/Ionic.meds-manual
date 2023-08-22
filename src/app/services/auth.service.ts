import { Injectable, inject } from '@angular/core';
import { Auth, User, user, createUserWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GlobalService, LogData, UserData } from './global.service';
import { FirebaseService } from './firebase.service';
import { dataTemp } from '../dataTemp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription;
  email: string | undefined;
  oldEmail: string | undefined;

  constructor(private router: Router,
    public authFireCompat: AngularFireAuth,
    private globalService: GlobalService,
    private firebaseService: FirebaseService) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.email = aUser?.email!;
      this.oldEmail = this.email;
    })

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.email = user.email!;
        console.log("Log: Sesi user authenticated");
      } else {
        this.email = this.oldEmail;
        console.log("Log: Sesi user not authenticated");
      }
    });
  }

  async Register(email: string, password: string, nama: string, tglLahir: string, profesi: string, lampiran: string, photo: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      var userData: UserData = { email: this.email!, nama: nama, tglLahir: tglLahir, profesi: profesi, lampiran: lampiran, photo: photo, isAdmin: false };
      await this.firebaseService.userDataListCollection.doc(userData.email).set(userData);
      var msg = "Register Berhasil";
      console.log('Log:', msg);
      this.CreateLog(dataTemp.log.register, msg);
      this.globalService.PresentToast(msg);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      var errorMessage = this.GetEror(error.code, error.message);
      var msg = "Register Gagal: " + errorMessage;
      console.log('Log:', msg);
      if (email) this.CreateLog(dataTemp.log.register, msg, email);
      this.globalService.PresentToast(errorMessage);
    }
  }

  async Login(email: string, password: string) {
    try {
      await this.authFireCompat.signInWithEmailAndPassword(email, password);
      var msg = "Login Berhasil";
      console.log('Log:', msg);
      this.CreateLog(dataTemp.log.login, msg);
      this.globalService.PresentToast(msg);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      console.log('HAPUS NANTI', error.code);
      console.log('HAPUS NANTI', email);
      console.log('HAPUS NANTI', password);

      var errorMessage = this.GetEror(error.code, error.message);
      var msg = "Login Gagal: " + errorMessage;
      console.log('Log:', msg);
      if (email) this.CreateLog(dataTemp.log.login, msg, email);
      this.globalService.PresentToast(errorMessage);
    };
  }

  async Logout() {
    try {
      await this.auth.signOut();
      var msg = "Logout Berhasil";
      console.log('Log:', msg);
      this.CreateLog(dataTemp.log.logout, msg);
      this.globalService.PresentToast(msg);
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } catch (error: any) {
      var errorMessage = this.GetEror(error.code, error.message);
      var msg = "Logout Gagal: " + errorMessage;
      this.CreateLog(dataTemp.log.logout, msg);
      this.globalService.PresentToast(msg);
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  CreateLog(log: string, logDetail: string, email?: string) {
    var logData: LogData = { email: email ? email : this.email!, log: log, logDetail: logDetail, dateTime: this.globalService.GetDate().todayDateTimeFormatted };
    this.firebaseService.logDataListCollection.add(logData);
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
