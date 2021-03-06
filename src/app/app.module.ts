import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthenticationService } from './shared/services/authentication.service';
import { CategoryModule } from './category/category.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { AssetsModule } from './assets/assets.module';
import { SoftwareLicensesModule } from './software-licenses/software-licenses.module';
import { DepartmentsModule } from './departments/departments.module';
import { LoansModule } from './loans/loans.module';
import { ServicesModule } from './services/services.module';
import { UtilityService } from './shared/services/utility.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    CategoryModule,
    EquipmentsModule,
    AssetsModule,
    SoftwareLicensesModule,
    DepartmentsModule,
    LoansModule,
    ServicesModule
  ],
  providers: [AuthenticationService, UtilityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
