import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchContentPage } from './search-content.page';

describe('SearchContentPage', () => {
  let component: SearchContentPage;
  let fixture: ComponentFixture<SearchContentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
