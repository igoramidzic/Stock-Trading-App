import { Component, OnInit, Input } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { TutorialItem } from 'src/app/core/models/tutorial/tutorialItem';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent implements OnInit {

  @Input() tutorialItems: TutorialItem[];

  constructor(private tutorialService: TutorialService) { }

  ngOnInit() {
  }

  get percentComplete(): number {
    if (!this.tutorialItems) return 0;
    return Math.ceil(this.tutorialItems.filter((item) => item.completed).length / this.tutorialItems.length * 1000) / 10
  }
}