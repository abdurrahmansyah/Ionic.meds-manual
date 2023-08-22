import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-asesmen',
  templateUrl: './asesmen.page.html',
  styleUrls: ['./asesmen.page.scss'],
})
export class AsesmenPage implements OnInit {

  constructor(private firebaseService: FirebaseService) { 
    // this.firebaseService.getNotes().subscribe(res => {
    //   console.log(res);
    // });
  }

  ngOnInit() {
  }

}
