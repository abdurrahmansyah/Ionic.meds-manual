import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterTwoPage } from './master-two.page';

describe('MasterTwoPage', () => {
  let component: MasterTwoPage;
  let fixture: ComponentFixture<MasterTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
