import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { EquipmentCreateComponent } from './equipment-create/equipment-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    EquipmentsListComponent,
    EquipmentCreateComponent
  ],
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
    MatAutocompleteModule
  ]
})
export class EquipmentsModule { }
