import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchContentTwoPage } from './search-content-two.page';

describe('SearchContentTwoPage', () => {
  let component: SearchContentTwoPage;
  let fixture: ComponentFixture<SearchContentTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchContentTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
