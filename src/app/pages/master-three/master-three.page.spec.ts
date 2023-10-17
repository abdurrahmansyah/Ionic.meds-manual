import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterThreePage } from './master-three.page';

describe('MasterThreePage', () => {
  let component: MasterThreePage;
  let fixture: ComponentFixture<MasterThreePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
