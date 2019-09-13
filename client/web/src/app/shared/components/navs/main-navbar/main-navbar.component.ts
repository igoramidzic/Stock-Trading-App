import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchStockModalComponent } from '../../stock/search-stock-modal/search-stock-modal.component';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor(public authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onOpen(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(SearchStockModalComponent);
  }

}
