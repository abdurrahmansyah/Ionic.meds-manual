import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriaseChildPage } from './triase-child.page';

describe('TriaseChildPage', () => {
  let component: TriaseChildPage;
  let fixture: ComponentFixture<TriaseChildPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TriaseChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
