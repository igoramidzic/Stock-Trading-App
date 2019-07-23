import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators'
import { ThemeService } from './services/theme/theme.service';
import { Theme } from './core/models/theme/theme';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  Theme = Theme;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public loadingService: LoadingService) { }

  ngOnInit(): void {
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
        if (event['title'])
          this.titleService.setTitle(event['title'] + ' | Robinhoood')
        else
          this.titleService.setTitle('Robinhood')
      });
  }
}
