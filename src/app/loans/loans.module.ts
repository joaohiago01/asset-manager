import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
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
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class LoansModule { }
