import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveiSekunderPage } from './survei-sekunder.page';

describe('SurveiSekunderPage', () => {
  let component: SurveiSekunderPage;
  let fixture: ComponentFixture<SurveiSekunderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SurveiSekunderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
