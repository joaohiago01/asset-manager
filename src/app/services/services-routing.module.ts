import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceListComponent,
  },
  {
    path: 'services/form',
    component: ServiceFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
