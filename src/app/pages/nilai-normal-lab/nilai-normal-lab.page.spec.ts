import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NilaiNormalLabPage } from './nilai-normal-lab.page';

describe('NilaiNormalLabPage', () => {
  let component: NilaiNormalLabPage;
  let fixture: ComponentFixture<NilaiNormalLabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NilaiNormalLabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
