import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsesmenPage } from './asesmen.page';

describe('AsesmenPage', () => {
  let component: AsesmenPage;
  let fixture: ComponentFixture<AsesmenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsesmenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
