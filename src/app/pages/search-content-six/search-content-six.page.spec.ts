import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchContentSixPage } from './search-content-six.page';

describe('SearchContentSixPage', () => {
  let component: SearchContentSixPage;
  let fixture: ComponentFixture<SearchContentSixPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchContentSixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
