import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentSixPage } from './content-six.page';

describe('ContentSixPage', () => {
  let component: ContentSixPage;
  let fixture: ComponentFixture<ContentSixPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentSixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
