import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Theme } from 'src/app/core/models/theme/theme';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  Theme = Theme

  constructor(public themeService: ThemeService, public loadingService: LoadingService) { }

  ngOnInit() {
    this.themeService.setActiveMainTheme();

    setTimeout(() => {
      // this.isLoading = false;
    }, 2000)
  }

}
