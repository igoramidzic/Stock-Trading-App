import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor(private loadingService: LoadingService) {
    this.loadingService.stopLoading();
  }

  ngOnInit() {
  }

}
