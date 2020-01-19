import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators'
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.loadingService.startLoading();
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationCancel))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.loadingService.stopLoading();
        if (event['title'])
          this.titleService.setTitle(event['title'] + ' | Stock Trading App')
        else
          this.titleService.setTitle('Stock Trading App')
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.loadingService.stopLoading();
        if (event['title'])
          this.titleService.setTitle(event['title'] + ' | Stock Trading App')
        else
          this.titleService.setTitle('Stock Trading App')
      });
  }
}
