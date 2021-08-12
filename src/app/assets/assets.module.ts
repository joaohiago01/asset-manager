import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetFormComponent } from './asset-form/asset-form.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AssetListComponent } from './asset-list/asset-list.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AssetDetailsComponent } from './asset-details/asset-details.component';

@NgModule({
  declarations: [
    AssetFormComponent,
    AssetListComponent,
    AssetDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    AssetsRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatFileUploadModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
  ],
})
export class AssetsModule {}
