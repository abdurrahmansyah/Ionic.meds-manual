import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchContentFivePage } from './search-content-five.page';

describe('SearchContentFivePage', () => {
  let component: SearchContentFivePage;
  let fixture: ComponentFixture<SearchContentFivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchContentFivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
