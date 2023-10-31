import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchContentThreePage } from './search-content-three.page';

describe('SearchContentThreePage', () => {
  let component: SearchContentThreePage;
  let fixture: ComponentFixture<SearchContentThreePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchContentThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
