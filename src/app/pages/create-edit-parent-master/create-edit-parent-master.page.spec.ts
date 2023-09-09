import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditParentMasterPage } from './create-edit-parent-master.page';

describe('CreateEditParentMasterPage', () => {
  let component: CreateEditParentMasterPage;
  let fixture: ComponentFixture<CreateEditParentMasterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateEditParentMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
