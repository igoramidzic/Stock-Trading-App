import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.scss']
})
export class AccountNavbarComponent implements OnInit {

  @Input() user: User;

  links: { label: string, route: string }[] = [
    { label: 'Account', route: '' },
    // { label: 'Banking', route: '/banking' },
    // { label: 'History', route: '/history' },
    // { label: 'Settings', route: '/settings' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
