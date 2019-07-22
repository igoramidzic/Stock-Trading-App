import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SelfService } from 'src/app/services/self/self.service';

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
    private fb: FormBuilder, private selfService: SelfService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.selfService.user$.subscribe((user) => console.log(user))
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
        this.selfService.updateSelf(res.result.user)
      })
      .catch((err: ClientResponse) => {
        this.errors = err.messages;
      })
      .finally(() => this.isSubmitting = false);
  }
}
