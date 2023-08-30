import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterChildPage } from './master-child.page';

describe('MasterChildPage', () => {
  let component: MasterChildPage;
  let fixture: ComponentFixture<MasterChildPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
