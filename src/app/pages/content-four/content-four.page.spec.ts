import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentFourPage } from './content-four.page';

describe('ContentFourPage', () => {
  let component: ContentFourPage;
  let fixture: ComponentFixture<ContentFourPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentFourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
