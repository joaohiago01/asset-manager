import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoftwareLicenseAssociationComponent } from './software-license-association/software-license-association.component';
import { SoftwareLicenseFormComponent } from './software-license-form/software-license-form.component';
import { SoftwareLicenseListComponent } from './software-license-list/software-license-list.component';

const routes: Routes = [
  {
    path: '',
    component: SoftwareLicenseListComponent,
  },
  {
    path: 'software-licenses/form',
    component: SoftwareLicenseFormComponent,
  },
  {
    path: 'software-licenses/associations',
    component: SoftwareLicenseAssociationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareLicensesRoutingModule { }
