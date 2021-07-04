import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoanFormComponent,
    LoanListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    LoansRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFileUploadModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ]
})
export class LoansModule { }
