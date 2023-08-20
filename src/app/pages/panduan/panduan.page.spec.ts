import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanduanPage } from './panduan.page';

describe('PanduanPage', () => {
  let component: PanduanPage;
  let fixture: ComponentFixture<PanduanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PanduanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
