import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Theme } from 'src/app/core/models/theme/theme';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  Theme = Theme

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
  }

}
