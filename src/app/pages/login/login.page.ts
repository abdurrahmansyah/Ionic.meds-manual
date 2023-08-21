import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

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

  Register() {
    let navigationExtras: NavigationExtras = {
      state: {
        emailLog: this.email
      }
    }
    this.router.navigate(['register'], navigationExtras);

    // this.router.navigateByUrl('/register', { replaceUrl: false });
  }

  Login() {
    console.log('email: ', this.email);
    console.log('password: ', this.password);

    this.authService.Login(this.email, this.password);
  }

}
