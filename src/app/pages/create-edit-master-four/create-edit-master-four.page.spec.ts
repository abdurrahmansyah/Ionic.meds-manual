import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditMasterFourPage } from './create-edit-master-four.page';

describe('CreateEditMasterFourPage', () => {
  let component: CreateEditMasterFourPage;
  let fixture: ComponentFixture<CreateEditMasterFourPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateEditMasterFourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
