import { Injectable, inject } from '@angular/core';
import { Auth, User, user, createUserWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription;

  constructor(private router: Router,
    public authFireCompat: AngularFireAuth,
    private globalService: GlobalService) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      // console.log("aUser", aUser);
    })

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log("uid", uid);
        console.log("Log: User telah login");
      } else {
        console.log("Log: User telah logout");
      }
    });
  }

  Register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log("user register", user);
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      })
      .catch((error) => {
        var errorMessage = this.GetEror(error.code, error.message);
        this.globalService.PresentToast(errorMessage);
      });
  }

  Login(email: string, password: string) {
    this.authFireCompat.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log("user login", user);
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      })
      .catch((error) => {
        var errorMessage = this.GetEror(error.code, error.message);
        this.globalService.PresentToast(errorMessage);
      });
  }

  Logout() {
    this.auth.signOut().then(() => {
      // this.storage.remove('idKaryawan').then(() =>
      this.router.navigateByUrl('/login', { replaceUrl: true })
      // );
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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
    if (errCode == 'auth') return 'ditemukan';
    else return errMsg;
  }
}
