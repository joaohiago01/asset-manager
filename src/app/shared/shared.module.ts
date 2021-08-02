import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    MenuComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
