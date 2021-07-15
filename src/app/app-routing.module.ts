import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationGuardService } from './shared/services/authentication-guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'equipments',
    loadChildren: () => import('./equipments/equipments.module').then(m => m.EquipmentsModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.module').then(m => m.AssetsModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'software-licenses',
    loadChildren: () => import('./software-licenses/software-licenses.module').then(m => m.SoftwareLicensesModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'departments',
    loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'loans',
    loadChildren: () => import('./loans/loans.module').then(m => m.LoansModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
    canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
