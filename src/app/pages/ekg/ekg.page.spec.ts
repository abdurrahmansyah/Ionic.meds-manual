import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EkgPage } from './ekg.page';

describe('EkgPage', () => {
  let component: EkgPage;
  let fixture: ComponentFixture<EkgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EkgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
