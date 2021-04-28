import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { EquipmentCreateComponent } from './equipment-create/equipment-create.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsListComponent
  },
  {
    path: 'equipments/create',
    component: EquipmentCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsRoutingModule { }