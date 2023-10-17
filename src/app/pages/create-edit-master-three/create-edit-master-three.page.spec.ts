import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditMasterThreePage } from './create-edit-master-three.page';

describe('CreateEditMasterThreePage', () => {
  let component: CreateEditMasterThreePage;
  let fixture: ComponentFixture<CreateEditMasterThreePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateEditMasterThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
