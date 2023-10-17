import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterSixPage } from './master-six.page';

describe('MasterSixPage', () => {
  let component: MasterSixPage;
  let fixture: ComponentFixture<MasterSixPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterSixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
