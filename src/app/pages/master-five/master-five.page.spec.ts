import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterFivePage } from './master-five.page';

describe('MasterFivePage', () => {
  let component: MasterFivePage;
  let fixture: ComponentFixture<MasterFivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterFivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
