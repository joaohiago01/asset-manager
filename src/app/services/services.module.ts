import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ServiceListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServicesRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ServicesModule { }
