import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { SelfService } from 'src/app/services/self/self.service';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService, private selfService: SelfService) { }

  ngOnInit() {
    this.selfService.user$.subscribe((user: User) => {
      this.user = user;
    })
  }

}
