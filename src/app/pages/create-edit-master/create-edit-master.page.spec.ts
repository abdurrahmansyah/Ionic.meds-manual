import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditMasterPage } from './create-edit-master.page';

describe('CreateEditMasterPage', () => {
  let component: CreateEditMasterPage;
  let fixture: ComponentFixture<CreateEditMasterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateEditMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
