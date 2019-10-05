import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { SelfService } from 'src/app/services/self/self.service';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.scss']
})
export class ProfileUpdateFormComponent implements OnInit {

  profileForm: FormGroup;
  isSubmitting: boolean = false;
  user: User;
  errors: string[];
  done: boolean;

  constructor(private fb: FormBuilder, private selfService: SelfService) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    })

    this.selfService.user$.subscribe((user: User) => {
      this.user = user;
      this.setFormValues(user);
    })

    this.setFormValues(this.user);

    this.profileForm.valueChanges.subscribe(() => {
      this.done = false;
    })
  }

  setFormValues(user): void {
    this.profileForm.controls['firstName'].setValue(user.firstName);
    this.profileForm.controls['lastName'].setValue(user.lastName);
    this.profileForm.controls['email'].setValue(user.email);
  }

  updateProfile(): void {
    if (!this.profileForm.valid) return;

    this.isSubmitting = true;
    this.done = false;

    this.errors = null;

    setTimeout(() => {
      this.selfService.updateSelf(this.profileForm.value)
        .then((user: User) => {
          this.profileForm.markAsPristine()
          this.done = true;
        })
        .catch((error: ClientResponse) => {
          this.errors = error.messages
        })
        .finally(() => this.isSubmitting = false)
    }, 300);
  }

}
