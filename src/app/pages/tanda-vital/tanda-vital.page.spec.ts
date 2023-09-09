import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TandaVitalPage } from './tanda-vital.page';

describe('TandaVitalPage', () => {
  let component: TandaVitalPage;
  let fixture: ComponentFixture<TandaVitalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TandaVitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
