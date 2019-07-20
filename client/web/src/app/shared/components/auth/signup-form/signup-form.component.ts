import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(): void {
    this.authService.authenticate('', '')
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(() => {
        console.log("Something went wrong");
      })
  }
}
