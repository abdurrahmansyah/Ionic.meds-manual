import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input('title') title: string = '';
  @Input('defaultHref') defaultHref: string = '';

  constructor() { }

  ngOnInit() {
    this.defaultHref = this.defaultHref == '' ? 'tabs/asesmen' : this.defaultHref;
  }
}
