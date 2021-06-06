import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsListComponent
  },
  {
    path: 'equipments/form',
    component: EquipmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsRoutingModule { }
