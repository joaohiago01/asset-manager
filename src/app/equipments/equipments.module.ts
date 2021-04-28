import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { EquipmentCreateComponent } from './equipment-create/equipment-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatFormFieldModule
  ]
})
export class EquipmentsModule { }