import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterChildTwoPage } from './master-child-two.page';

describe('MasterChildTwoPage', () => {
  let component: MasterChildTwoPage;
  let fixture: ComponentFixture<MasterChildTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterChildTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
