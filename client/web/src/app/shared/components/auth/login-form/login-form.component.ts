import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onLogin(): void {
    this.authService.authenticate('', '')
      .then(() => {
        this.router.navigate(['']);
      })
      .catch(() => {
        console.log("Something went wrong");
      })
  }

}
