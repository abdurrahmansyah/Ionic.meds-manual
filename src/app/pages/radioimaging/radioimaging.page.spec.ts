import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioimagingPage } from './radioimaging.page';

describe('RadioimagingPage', () => {
  let component: RadioimagingPage;
  let fixture: ComponentFixture<RadioimagingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RadioimagingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
