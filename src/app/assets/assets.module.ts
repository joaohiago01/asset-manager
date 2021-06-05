import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetFormComponent } from './asset-form/asset-form.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AssetFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    AssetsRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AssetsModule { }
