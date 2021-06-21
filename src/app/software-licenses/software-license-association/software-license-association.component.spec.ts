import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLicenseAssociationComponent } from './software-license-association.component';

describe('SoftwareLicenseAssociationComponent', () => {
  let component: SoftwareLicenseAssociationComponent;
  let fixture: ComponentFixture<SoftwareLicenseAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareLicenseAssociationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareLicenseAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
