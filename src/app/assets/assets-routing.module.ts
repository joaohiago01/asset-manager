import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetFormComponent } from './asset-form/asset-form.component';

const routes: Routes = [
  {
    path: 'assets/form',
    component: AssetFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
