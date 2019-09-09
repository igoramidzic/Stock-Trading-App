import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelfService } from 'src/app/services/self/self.service';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Component({
  selector: 'app-password-update-form',
  templateUrl: './password-update-form.component.html',
  styleUrls: ['./password-update-form.component.scss']
})
export class PasswordUpdateFormComponent implements OnInit {

  passwordForm: FormGroup;
  isSubmitting: boolean = false;
  errors: string[] = [];
  done: boolean;

  constructor(private fb: FormBuilder, private selfService: SelfService) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      currentPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    })

    this.passwordForm.valueChanges.subscribe(() => {
      this.done = false;
    })
  }

  updatePassword(): void {
    if (!this.passwordForm.valid) return;
    if (!this.formIsValid(this.passwordForm)) return;

    this.isSubmitting = true;
    this.done = false;

    this.errors = [];

    setTimeout(() => {
      this.selfService.updatePassword(this.passwordForm.value)
        .then((success: boolean) => {
          this.passwordForm.reset();
          this.done = true;
        })
        .catch((error: ClientResponse) => {
          this.errors = error.messages
        })
        .finally(() => this.isSubmitting = false)
    }, 300);
  }

  formIsValid(form: FormGroup): boolean {
    this.errors = [];

    let hasError = false;

    const { newPassword, confirmPassword } = form.value;
    if (newPassword.length < 8) {
      this.errors.push("New password must be at least 8 characters long.")
      hasError = true;
    }
    else if (newPassword !== confirmPassword) {
      this.errors.push("Confirm password does not match.")
      hasError = true;
    }

    return !hasError;
  }

}
