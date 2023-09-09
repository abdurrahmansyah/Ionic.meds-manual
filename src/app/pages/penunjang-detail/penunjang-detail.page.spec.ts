import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenunjangDetailPage } from './penunjang-detail.page';

describe('PenunjangDetailPage', () => {
  let component: PenunjangDetailPage;
  let fixture: ComponentFixture<PenunjangDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PenunjangDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
