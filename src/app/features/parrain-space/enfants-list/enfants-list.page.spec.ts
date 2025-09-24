import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnfantsListPage } from './enfants-list.page';

describe('EnfantsListPage', () => {
  let component: EnfantsListPage;
  let fixture: ComponentFixture<EnfantsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfantsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
