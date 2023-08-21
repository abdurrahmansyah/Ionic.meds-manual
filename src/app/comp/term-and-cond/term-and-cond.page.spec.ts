import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermAndCondPage } from './term-and-cond.page';

describe('TermAndCondPage', () => {
  let component: TermAndCondPage;
  let fixture: ComponentFixture<TermAndCondPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TermAndCondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
