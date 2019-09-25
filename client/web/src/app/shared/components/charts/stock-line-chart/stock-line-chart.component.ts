import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-stock-line-chart',
  templateUrl: './stock-line-chart.component.html',
  styleUrls: ['./stock-line-chart.component.scss']
})
export class StockLineChartComponent implements OnInit, OnChanges {

  @Input() quote: StockQuote;

  public lineChartData: ChartDataSets[] = [
    { lineTension: 0 }
  ];
  public lineChartLabels: Label[] = ['', ''];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    hover: {
      animationDuration: 0
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  public lineChartColors: Color[] = [
    { // green
      borderWidth: 2,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(43, 208, 186, 1)',
      pointBackgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(0,0,0,0)',
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)'
    },
    { // red
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(209, 65, 40, 1)',
      pointBackgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(0,0,0,0)',
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
    this.newStockUpdate(this.quote);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quote)
      if (changes.quote.previousValue && changes.quote.previousValue.symbol == changes.quote.currentValue.symbol)
        this.sameStockUpdate(changes.quote.currentValue);
      else
        this.newStockUpdate(changes.quote.currentValue)
  }

  updateLineColor(): void {
    if (this.lineChartData[0].data[0] <= this.lineChartData[0].data[this.lineChartData[0].data.length - 1])
      this.lineChartColors[0].borderColor = 'rgba(43, 208, 186, 1)';
    else
      this.lineChartColors[0].borderColor = 'rgba(209, 65, 40, 1)';
  }

  newStockUpdate(quote: StockQuote): void {
    this.lineChartData[0].data = [quote.previousClose, quote.latestPrice];
    this.lineChartLabels = ['', ''];
    this.updateLineColor();
    this.chart.update();
  }

  sameStockUpdate(quote: StockQuote): void {
    if (this.lineChartData[0].data && quote) {
      this.lineChartData[0].data.push(quote.latestPrice);
      this.lineChartLabels.push("");
      this.updateLineColor();
      this.chart.update();
    }
  }
}
