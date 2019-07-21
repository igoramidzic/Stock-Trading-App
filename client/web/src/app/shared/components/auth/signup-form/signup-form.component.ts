import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  isSubmitting: boolean = false;
  errors: string[];

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    };

    this.isSubmitting = true;
    this.errors = [];

    this.authService.signUp(this.signupForm.value)
      .then((res: ClientResponse) => {
        this.router.navigate(['/']);
      })
      .catch((err: ClientResponse) => {
        this.errors = err.messages;
      })
      .finally(() => this.isSubmitting = false);
  }
}
