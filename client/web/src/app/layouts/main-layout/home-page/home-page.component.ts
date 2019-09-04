import { Component, OnInit } from '@angular/core';
import { SelfService } from 'src/app/services/self/self.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  thingsToDo: ThingToDo[];

  constructor(public selfService: SelfService) { }

  ngOnInit() {
    this.thingsToDo = [
      {
        title: 'Search for your favorite stock or ETF.',
        description: 'Type \'AAPL\' in the search bar above.'
      },
      {
        title: 'Update your name, email, or password.',
        description: 'Visit the Settings tab in the Account menu.'
      },
      {
        title: 'Link your bank account with Batman.',
        description: 'Visit the Banking tab in the Account menu.'
      },
      {
        title: 'Delete your account.',
        description: 'Visit the Settings tab in the Account menu. I\'ll miss you, ' + this.selfService.user$.value.firstName + '.'
      }
    ]
  }

}

interface ThingToDo {
  title: string;
  description: string;
}