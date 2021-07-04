import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';


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
