import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [EquipmentsListComponent, EquipmentFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    EquipmentsRoutingModule,
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
export class EquipmentsModule {}
