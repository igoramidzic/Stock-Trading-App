import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavSearchComponent } from '../../navs/main-navbar/nav-search/nav-search.component';

@Component({
  selector: 'app-search-stock-modal',
  templateUrl: './search-stock-modal.component.html',
  styleUrls: ['./search-stock-modal.component.scss']
})
export class SearchStockModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onOpen(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(NavSearchComponent);
  }
}
