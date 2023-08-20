import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenunjangPage } from './penunjang.page';

describe('PenunjangPage', () => {
  let component: PenunjangPage;
  let fixture: ComponentFixture<PenunjangPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PenunjangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
