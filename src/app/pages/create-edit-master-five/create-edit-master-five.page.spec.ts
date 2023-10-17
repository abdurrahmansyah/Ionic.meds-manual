import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditMasterFivePage } from './create-edit-master-five.page';

describe('CreateEditMasterFivePage', () => {
  let component: CreateEditMasterFivePage;
  let fixture: ComponentFixture<CreateEditMasterFivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateEditMasterFivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
