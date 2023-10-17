import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterFourPage } from './master-four.page';

describe('MasterFourPage', () => {
  let component: MasterFourPage;
  let fixture: ComponentFixture<MasterFourPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterFourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
