import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';

@Component({
  selector: 'app-penunjang',
  templateUrl: './penunjang.page.html',
  styleUrls: ['./penunjang.page.scss'],
})
export class PenunjangPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() { }

  Radioimaging() { this.router.navigate([dataTemp.route.radioimaging]); }

  NilaiNormalLab() { this.router.navigate([dataTemp.route.nilaiNormalLab]); }

  EKG() { this.router.navigate([dataTemp.route.ekg]); }
}
