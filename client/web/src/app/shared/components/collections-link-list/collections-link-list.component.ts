import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collections-link-list',
  templateUrl: './collections-link-list.component.html',
  styleUrls: ['./collections-link-list.component.scss']
})
export class CollectionsLinkListComponent implements OnInit {

  @Input() collectionLinks: string[];

  constructor() { }

  ngOnInit() {
  }

}
