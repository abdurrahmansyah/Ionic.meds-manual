import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentFivePage } from './content-five.page';

describe('ContentFivePage', () => {
  let component: ContentFivePage;
  let fixture: ComponentFixture<ContentFivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentFivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
