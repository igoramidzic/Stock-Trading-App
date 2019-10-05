import { Component, OnInit } from '@angular/core';
import { SelfService } from 'src/app/services/self/self.service';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';
import { ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/services/stock/stock.service';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { TutorialItem } from 'src/app/core/models/tutorial/tutorialItem';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  thingsToDo: ThingToDo[];
  watchlist: StockDetails[];
  tutorialItems: TutorialItem[];

  constructor(public selfService: SelfService,
    private route: ActivatedRoute, private tutorialService: TutorialService) { }

  ngOnInit() {
    this.thingsToDo = [
      {
        title: 'Search for your favorite stock or ETF.',
        description: 'Type \'AAPL\' in the search bar above.'
      },
      {
        title: 'Add stock to Watchlist.',
        description: 'Add your favorite stock to your Watchlist.'
      },
      {
        title: 'Link your bank account with Batman.',
        description: 'Visit the Banking tab in the Account menu.'
      },
      {
        title: 'Transfer funds to your Batman account.',
        description: 'Visit the Banking tab in the Account menu and transfer funds.'
      },
      {
        title: 'Purchase your first stock.',
        description: 'Search for a stock and purchase shares.'
      },
      {
        title: 'Update your name, email, or password.',
        description: 'Visit the Settings tab in the Account menu.'
      },
      {
        title: 'Delete your account.',
        description: 'Visit the Settings tab in the Account menu. I\'ll miss you, ' + this.selfService.user$.value.firstName + '.'
      }
    ]

    this.watchlist = this.route.snapshot.data.watchlist;
    this.getTutorialItems();
  }

  getTutorialItems(): void {
    this.tutorialService.getTutorialItems()
      .then((tutorialItems: TutorialItem[]) => {
        tutorialItems.sort((a, b) => a.order > b.order ? 1 : -1);
        this.tutorialItems = tutorialItems;
      })
      .catch((err) => console.log(err))
  }

  get incompleteTutorialItems(): TutorialItem[] {
    return this.tutorialItems.filter((item) => { return !item.completed })
  }
}

interface ThingToDo {
  title: string;
  description: string;
}