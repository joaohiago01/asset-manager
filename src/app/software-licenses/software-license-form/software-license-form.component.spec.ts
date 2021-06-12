import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLicenseFormComponent } from './software-license-form.component';

describe('SoftwareLicenseFormComponent', () => {
  let component: SoftwareLicenseFormComponent;
  let fixture: ComponentFixture<SoftwareLicenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareLicenseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareLicenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
