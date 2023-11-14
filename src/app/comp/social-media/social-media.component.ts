import { Component, OnInit } from '@angular/core';
import { AppLauncher } from '@capacitor/app-launcher';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  async checkCanOpenUrl() {
    const value = await AppLauncher.canOpenUrl({ url: 'com.instagram.android' });

    console.log('Can open url: ', value);
  }

  async openPortfolioPage() {
    await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });
  }

  Sosmed(id: number) {
    var link = ''
    if (id == 0) link = 'https://www.instagram.com/medsmanual/';
    if (id == 1) link = 'https://api.whatsapp.com/send?phone=6281572011772';
    if (id == 2) link = 'https://medsmanual.com/';
    if (id == 3) link = 'mailto:medsmanual@gmail.com';

    window.open(link, '_system', 'location=yes')
  }
}
