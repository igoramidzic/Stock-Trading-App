import { Component, OnInit, Input } from '@angular/core';
import { TutorialItem } from 'src/app/core/models/tutorial/tutorialItem';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { SelfService } from 'src/app/services/self/self.service';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent implements OnInit {

  tutorialItems: TutorialItem[];

  constructor(private tutorialService: TutorialService,
    private selfService: SelfService) { }

  ngOnInit() {
    this.getTutorialItems();
  }

  getTutorialItems(): void {
    this.tutorialService.getTutorialItems()
      .then((tutorialItems: TutorialItem[]) => {
        tutorialItems.sort((a, b) => a.order > b.order ? 1 : -1);
        this.tutorialItems = tutorialItems;
      })
      .catch((err) => console.log(err))
  }

  get percentComplete(): number {
    if (!this.tutorialItems) return 0;
    return Math.ceil(this.tutorialItems.filter((item) => item.completed).length / this.tutorialItems.length * 1000) / 10
  }

  get showHideBtn(): boolean {
    if (!this.tutorialItems) return false;
    return this.tutorialItems.filter((item) => !item.completed).length > 0 ? false : true;
  }

  hideTutorial(): void {
    this.tutorialService.hideTutorial()
      .then((hideTutorial: boolean) => {
        let user = this.selfService.user$.value;
        user.hideTutorial = hideTutorial;
        this.selfService.user$.next(user);
      })
      .catch(() => { })
  }
}