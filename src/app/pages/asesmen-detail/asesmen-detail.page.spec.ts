import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsesmenDetailPage } from './asesmen-detail.page';

describe('AsesmenDetailPage', () => {
  let component: AsesmenDetailPage;
  let fixture: ComponentFixture<AsesmenDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsesmenDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
