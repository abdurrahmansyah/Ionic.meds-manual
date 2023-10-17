import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditMasterSixPage } from './create-edit-master-six.page';

describe('CreateEditMasterSixPage', () => {
  let component: CreateEditMasterSixPage;
  let fixture: ComponentFixture<CreateEditMasterSixPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateEditMasterSixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
