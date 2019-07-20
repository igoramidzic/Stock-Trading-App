import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-alert',
  templateUrl: './main-alert.component.html',
  styleUrls: ['./main-alert.component.scss']
})
export class MainAlertComponent implements OnInit {

  @Input() errors: string[];

  constructor() { }

  ngOnInit() {
  }

}
