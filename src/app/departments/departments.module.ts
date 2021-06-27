import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './departments-list/departments-list.component';

@NgModule({
  declarations: [DepartmentsListComponent],
  imports: [
    SharedModule,
    CommonModule,
    DepartmentsRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFileUploadModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class DepartmentsModule {}
