import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent implements OnInit {

  notifications: Notification[] = [
    {
      event: 'Transfer Complete',
      message: "Your $9723.10 transfer to your bank is complete."
    },
    {
      event: 'Transfer Complete',
      message: "Your $9723.10 transfer to your bank is complete."
    },
    {
      event: 'Transfer Complete',
      message: "Your $9723.10 transfer to your bank is complete."
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

interface Notification {
  event: string;
  message: string;
}