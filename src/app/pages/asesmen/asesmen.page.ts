import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TabsPage } from 'src/app/tabs/tabs.page';

@Component({
  selector: 'app-asesmen',
  templateUrl: './asesmen.page.html',
  styleUrls: ['./asesmen.page.scss'],
})
export class AsesmenPage implements OnInit {

  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private tabsPage: TabsPage) {
    // this.firebaseService.getNotes().subscribe(res => {
    //   console.log(res);
    // });
  }

  ngOnInit() {
  }

  Triase() { this.router.navigate(['/tabs/asesmen/triase']); }
}
