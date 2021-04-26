import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    SharedModule,
    CommonModule,
    CategoryRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class CategoryModule {}
