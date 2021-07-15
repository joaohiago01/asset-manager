import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanListComponent } from './loan-list/loan-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoanListComponent,
  },
  {
    path: 'loans/form',
    component: LoanFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansRoutingModule { }
