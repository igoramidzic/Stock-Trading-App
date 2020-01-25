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

  constructor(public selfService: SelfService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
}