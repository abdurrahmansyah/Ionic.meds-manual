import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriasePage } from './triase.page';

describe('TriasePage', () => {
  let component: TriasePage;
  let fixture: ComponentFixture<TriasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TriasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
