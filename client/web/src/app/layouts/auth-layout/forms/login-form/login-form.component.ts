import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { SelfService } from 'src/app/services/self/self.service';
import { User } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  isSubmitting: boolean = false;
  errors: string[];

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private selfService: SelfService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    };

    this.isSubmitting = true;
    this.errors = [];

    this.authService.authenticate(this.loginForm.value)
      .then((user: User) => {
        this.router.navigate(['/']);
        this.selfService.user$.next(user);
      })
      .catch((err: ClientResponse) => {
        this.errors = err.messages;
      })
      .finally(() => this.isSubmitting = false);
  }

}
