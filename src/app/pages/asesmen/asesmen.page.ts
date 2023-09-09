import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataTemp } from 'src/app/dataTemp';

@Component({
  selector: 'app-asesmen',
  templateUrl: './asesmen.page.html',
  styleUrls: ['./asesmen.page.scss'],
})
export class AsesmenPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() { }

  Triase() { this.router.navigate([dataTemp.route.triase]); }

  SurveiPrimer() { this.router.navigate([dataTemp.route.surveiPrimer]); }

  SurveiSekunder() { this.router.navigate([dataTemp.route.surveiSekunder]); }

  TandaVital() { this.router.navigate([dataTemp.route.tandaVital]); }
}
