import { Component, OnInit } from '@angular/core';
import { SelfService } from 'src/app/services/self/self.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public selfService: SelfService) { }

  ngOnInit() {
  }

}
