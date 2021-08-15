import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NotificationComponent } from './notification/notification.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    MenuComponent,
    NotificationComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    NotificationComponent,
    ConfirmationModalComponent
  ]
})
export class SharedModule { }
