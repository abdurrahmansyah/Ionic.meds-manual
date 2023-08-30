import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private globalService: GlobalService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  Logout() {
    this.authService.Logout();
  }

  Admin() { this.router.navigate(['/tabs/profil/admin']); }
}
