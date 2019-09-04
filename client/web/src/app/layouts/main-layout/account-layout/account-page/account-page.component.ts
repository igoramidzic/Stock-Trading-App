import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private loadingService: LoadingService) {
    this.loadingService.stopLoading();
  }

  ngOnInit() {
  }

}
