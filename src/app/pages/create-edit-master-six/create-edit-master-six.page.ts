import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-master-six',
  templateUrl: './create-edit-master-six.page.html',
  styleUrls: ['./create-edit-master-six.page.scss'],
})
export class CreateEditMasterSixPage implements OnInit {
  param: any;

  // header
  title: string | undefined;
  defaultHref: string | undefined;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.GetExtras();
  }

  private async GetExtras() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.param = this.router.getCurrentNavigation()?.extras.state!['data'];

      this.title = this.param!.titleAlias ? this.param!.titleAlias : this.param!.title;
      this.defaultHref = this.param!.defaultHref;
      console.log('this.param', this.param);
    });
  }
}