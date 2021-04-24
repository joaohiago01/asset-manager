import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ]
})
export class CategoryModule { }
