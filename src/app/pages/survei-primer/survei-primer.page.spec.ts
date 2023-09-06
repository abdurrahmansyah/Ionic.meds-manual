import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveiPrimerPage } from './survei-primer.page';

describe('SurveiPrimerPage', () => {
  let component: SurveiPrimerPage;
  let fixture: ComponentFixture<SurveiPrimerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SurveiPrimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
