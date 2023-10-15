import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentTwoPage } from './content-two.page';

describe('ContentTwoPage', () => {
  let component: ContentTwoPage;
  let fixture: ComponentFixture<ContentTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
