import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareLicensesRoutingModule } from './software-licenses-routing.module';
import { SoftwareLicenseListComponent } from './software-license-list/software-license-list.component';
import { SoftwareLicenseFormComponent } from './software-license-form/software-license-form.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SoftwareLicenseAssociationComponent } from './software-license-association/software-license-association.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    SoftwareLicenseListComponent,
    SoftwareLicenseFormComponent,
    SoftwareLicenseAssociationComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SoftwareLicensesRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ]
})
export class SoftwareLicensesModule { }
