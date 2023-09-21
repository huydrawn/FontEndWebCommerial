import { HttpClient } from '@angular/common/http';
import { DoCheck, Injectable, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { JwtToken } from '../models/jwt-token';
import { User } from '../models/user';
import { OAuthService } from 'angular-oauth2-oidc';
import { OauthLoginRequest } from '../models/oauth-login-request';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TimmerService } from './timmer.service';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  statusAccount: string | undefined;

  baseUrl = 'http://localhost:8080/auth';
  user: User | undefined;
  public config = {
    issuer: 'https://accounts.google.com',
    redirectUri: "http://localhost:4200/signin",
    clientId: '790048615602-63eqj1ec5eilufn3negb75ctl1mo5an0.apps.googleusercontent.com',
    dummyClientSecret: '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',
    scope: 'openid profile email ',
    responseType: 'code',
    requestAccessToken: true,
    // showDebugInformation: true,
    tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
    userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',

    strictDiscoveryDocumentValidation: false,
  }

  constructor(private userService: UserService, private http: HttpClient, private toastr: ToastrService, private router: Router, private oauth: OAuthService, private timmer: TimmerService) {
    this.oauth.configure(this.config);
    this.oauth.loadDiscoveryDocumentAndTryLogin();
  }


  loginWithGoogle() {
    if (!this.oauth.getAccessToken()) {
      this.oauth.initImplicitFlow();
    }
    else {
      this.oauth.logOut();
    }

  }

  navigateAfterLogin() {
    console.log(localStorage.getItem("token"))
    this.http.get<Response>("http://localhost:8080/account/status").subscribe((res) => {
      console.log(res)
      if (res.msg == "Authorized") {
        if (localStorage.getItem("rebackURL")) {
          this.router.navigate([`${localStorage.getItem("rebackURL")}`]);
          localStorage.removeItem("rebackURL")
        }
        else {
          this.router.navigate(["/"]);
        }
        this.timmer.startTimer(15, () => {
          this.logout();
        });
        this.userService.loadUser();
        this.toastr.success('Đăng nhập thành công', 'Login Success', { timeOut: 3000 });
      }

      else {
        this.router.navigate(["/error-page"])
        localStorage.removeItem("token");
        this.oauth.logOut();

      }
      this.statusAccount = res.msg;
    }, error => {
      this.router.navigate(["/error-page"])
      localStorage.removeItem("token");
      this.oauth.logOut();

    })
  }

  oauthLogin(login: OauthLoginRequest) {
    this.http.post<JwtToken>(`${this.baseUrl}/oauth2`, login).subscribe((res) => {
      localStorage.setItem("token", JSON.stringify(res));
      if (localStorage.getItem("token")) {

        this.navigateAfterLogin();

      }
    },
      error => {
        this.toastr.error(error.error, 'Login Failure', { timeOut: 3000 });

      }
    );
  }
  gotoLogin() {
    this.router.navigate(["/signin"]);
  } 
  isLoggin() {
    return localStorage.getItem("token");
  }
  login(login: LoginRequest) { 

    this.http.post<JwtToken>(`${this.baseUrl}`, login).subscribe((res) => {
      localStorage.setItem("token", JSON.stringify(res));
      if (localStorage.getItem("token")) {

        this.navigateAfterLogin();
      }
    },
      error => {
        this.toastr.error(error.error, 'Login Failure', { timeOut: 3000 });
      }
    );
  }
  logout() {

    this.router.navigate(["/signin"]);
    localStorage.removeItem("token");
    this.oauth.logOut();
  }
}
