import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepensesAddPage } from './depenses-add.page';

describe('DepensesAddPage', () => {
  let component: DepensesAddPage;
  let fixture: ComponentFixture<DepensesAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DepensesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
