import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Input()
  public modalName: string = 'confirmationModal'

  @Input()
  public title: string = '';

  @Input()
  public message: string = '';

  @Input()
  public itemName: string = '';

  constructor(
    public utilityService: UtilityService
  ) { }

  ngOnInit(): void {
  }

}
