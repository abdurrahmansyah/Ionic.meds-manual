import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditMasterTwoPage } from './create-edit-master-two.page';

describe('CreateEditMasterTwoPage', () => {
  let component: CreateEditMasterTwoPage;
  let fixture: ComponentFixture<CreateEditMasterTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateEditMasterTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
