import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchContentFourPage } from './search-content-four.page';

describe('SearchContentFourPage', () => {
  let component: SearchContentFourPage;
  let fixture: ComponentFixture<SearchContentFourPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchContentFourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
