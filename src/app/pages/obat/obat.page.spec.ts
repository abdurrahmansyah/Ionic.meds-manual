import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObatPage } from './obat.page';

describe('ObatPage', () => {
  let component: ObatPage;
  let fixture: ComponentFixture<ObatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
