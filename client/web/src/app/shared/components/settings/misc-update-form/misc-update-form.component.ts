import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelfService } from 'src/app/services/self/self.service';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { User } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-misc-update-form',
  templateUrl: './misc-update-form.component.html',
  styleUrls: ['./misc-update-form.component.scss']
})
export class MiscUpdateFormComponent implements OnInit {

  isSubmitting: boolean = false;
  errors: string[];
  user: User;
  done: boolean;

  constructor(private fb: FormBuilder, private selfService: SelfService,
    private tutorialService: TutorialService) { }

  ngOnInit() {
    this.selfService.user$.subscribe((user: User) => {
      this.user = user;
    })
  }

  toggleTutorial(): void {
    let promise: Promise<boolean>;

    if (this.user.hideTutorial)
      promise = this.tutorialService.showTutorial();
    else
      promise = this.tutorialService.hideTutorial();

    promise
      .then((hideTutorial: boolean) => {
        this.user.hideTutorial = hideTutorial;
      })
      .catch((err) => {
        console.log(err)
      })
  }

}
