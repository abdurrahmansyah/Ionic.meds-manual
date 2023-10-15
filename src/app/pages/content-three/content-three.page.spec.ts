import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentThreePage } from './content-three.page';

describe('ContentThreePage', () => {
  let component: ContentThreePage;
  let fixture: ComponentFixture<ContentThreePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
