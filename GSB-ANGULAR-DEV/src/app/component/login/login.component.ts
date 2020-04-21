import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/services/auth.service';
import { CheckCredentialDto } from 'src/app/api/models/check-credential-dto';
import { TokenDto } from 'src/app/api/models/token-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  formInput: FormGroup;
  snackConfig: MatSnackBarConfig = {duration: 2000};

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private readonly authService: AuthService,
              private readonly cookieSrv: CookieService,
              private readonly snackBar: MatSnackBar,
              private readonly roleGuards: MatSnackBar) {

              this.formInput = this.formBuilder.group({
                email: ['', Validators.compose([Validators.email, Validators.required])],
                password: ['']
              });

   }

  login(): void {
    if ( this.formInput.valid) {
      const credentials: CheckCredentialDto = {
        email: this.formInput.value.email,
        password: this.formInput.value.password
      };
      this.authService.postAuthLogin(credentials).toPromise().then(
        (token: TokenDto) => {
          this.cookieSrv.setItem('token', token.access_token);
          const tokens = this.cookieSrv.getItem('token');
          // decode the token to get its payload
          const tokenPayload = decode(tokens);

          if (tokenPayload['role'] === 'Admin') { this.router.navigate(['users']); } else { this.router.navigate(['commercials']); }

        },
        error => this.snackBar.open(error.status === 401 ? error.error.message : 'Email incorrect.', 'OK', this.snackConfig)
      );
    } else {
      this.snackBar.open('Email incorrect.', 'OK', this.snackConfig);
    }

  }

  OnClickSignup() {
    this.router.navigate(['signup']);
  }

  ngOnInit() {
  }

}
