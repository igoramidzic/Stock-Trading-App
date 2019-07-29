import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  // providers: [ThemeService]
})
export class MainLayoutComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.setActiveTheme();
  }

}
