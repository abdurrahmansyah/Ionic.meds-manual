import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewer, Image, ViewerOptions, capShowOptions, capShowResult } from '@capacitor-community/photoviewer';
import { Capacitor } from '@capacitor/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-photoviewer',
  templateUrl: './photoviewer.component.html',
  styleUrls: ['./photoviewer.component.scss'],
})
export class PhotoviewerComponent implements OnInit {
  @Input('data') data: string = '';
  @Output() pvExit: EventEmitter<any> = new EventEmitter();
  public dataSend: string = '';

  platform: string;
  imageList: Image[] = [];
  mode: string = "one";
  startFrom: number = 0;
  options: ViewerOptions = {} as ViewerOptions;
  pvPlugin: any;

  constructor(private globalService: GlobalService,
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.platform = Capacitor.getPlatform();
    this.pvPlugin = PhotoViewer;
  }

  async ngOnInit() {
    if (this.navParams.get('dataSend')) {
      this.data = this.navParams.get('dataSend');
    }

    this.imageList = [
      { url: 'https://i.ibb.co/wBYDxLq/beach.jpg', title: 'Beach Houses' },
      { url: 'https://i.ibb.co/gM5NNJX/butterfly.jpg', title: 'Butterfly' },
      { url: 'https://i.ibb.co/10fFGkZ/car-race.jpg', title: 'Car Racing' },
      { url: 'https://i.ibb.co/ygqHsHV/coffee-milk.jpg', title: 'Coffee with Milk' },
      { url: 'https://i.ibb.co/7XqwsLw/fox.jpg', title: 'Fox' },
      { url: 'https://i.ibb.co/L1m1NxP/girl.jpg', title: 'Mountain Girl' },
      { url: 'https://i.ibb.co/wc9rSgw/desserts.jpg', title: 'Desserts Table' },
      { url: 'https://i.picsum.photos/id/1009/5000/7502.jpg?hmac=Uj6crVILzsKbyZreBjHuMiaq_-n30qoHjqP0i7r30r8', title: 'Surfer' },
      { url: 'https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk', title: 'On a Lac' },
      { url: 'https://i.ibb.co/wdrdpKC/kitten.jpg', title: 'Kitten' },
      { url: 'https://i.ibb.co/dBCHzXQ/paris.jpg', title: 'Paris Eiffel' },
      { url: 'https://i.ibb.co/JKB0KPk/pizza.jpg', title: 'Pizza Time' },
      { url: 'https://i.ibb.co/VYYPZGk/salmon.jpg', title: 'Salmon ' },
    ];
  }
  
  async ngAfterViewInit() {
    var show = await this.Show(this.data);
    if (show) this.modalController.dismiss();
  }

  async Show(data: string) {
    const images = [
      { url: data, title: 'Image' }
    ]
    const opt: capShowOptions = {} as capShowOptions;
    opt.images = images;
    opt.mode = 'one';
    const options: ViewerOptions = {} as ViewerOptions;
    options.title = false;
    options.share = false;
    // options.transformer = "depth";
    // options.spancount = 2
    options.maxzoomscale = 3;
    options.compressionquality = 0.6;
    // options.movieoptions = { mode: 'portrait', imagetime: 3 };
    opt.options = options;

    try {
      const ret = await PhotoViewer.show(opt);
      console.log('hasil', ret);

      console.log(`in const show ret: ${JSON.stringify(ret)}`);
      if (ret.result) {
        console.log(`in const show ret true: ${JSON.stringify(ret)}`);
        return Promise.resolve(ret);
      } else {
        console.log(`in const show ret false: ${JSON.stringify(ret)}`);
        return Promise.reject(ret.message);
      }
    } catch (err: any) {
      const ret: capShowResult = {} as capShowResult;
      ret.result = false;
      ret.message = err.message;
      console.log(`in const show catch err: ${JSON.stringify(ret)}`);
      return Promise.reject(err.message);
    }
  }
}
