import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StockService } from 'src/app/services/stock/stock.service';
import { StockNews } from 'src/app/core/models/stock/news';

@Component({
  selector: 'app-stock-news',
  templateUrl: './stock-news.component.html',
  styleUrls: ['./stock-news.component.scss']
})
export class StockNewsComponent implements OnInit, OnChanges {

  @Input() symbol: string;
  newsItems: StockNews[];
  showGetMoreNews: boolean = true;
  loadingMoreNews: boolean;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.getNews(this.symbol);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.symbol)
      this.getNews(changes.symbol.currentValue)
  }

  getNews(symbol: string): void {
    this.stockService.news(symbol, 3)
      .then((news: StockNews[]) => {
        this.newsItems = news;
      })
      .catch(() => { })
  }

  getHours(num: number): number {
    return Math.ceil((Date.now() - num) / (1000 * 60 * 60))
  }

  getMoreNews(): void {
    this.loadingMoreNews = true;
    this.stockService.news(this.symbol, 15)
      .then((news: StockNews[]) => {
        this.newsItems = news;
        this.showGetMoreNews = false;
      })
      .catch(() => { })
      .finally(() => this.loadingMoreNews = false)
  }
}
