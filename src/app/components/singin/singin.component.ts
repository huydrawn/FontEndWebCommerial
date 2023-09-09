import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/models/login-request';
import { OauthLoginRequest } from 'src/app/models/oauth-login-request';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements DoCheck {
  loginForm: FormGroup;
  user:User|undefined;
  isLoggin = false;
 
  
  constructor(private toastr:ToastrService, private router:Router,private formBuilder: FormBuilder , private loginservice : LoginService , private auth: OAuthService) {
    this.loginForm = formBuilder.group({
     
      username: ['', Validators.required],
      password: ['', Validators.required],
      
    });
  }
  ngDoCheck(): void {
    
    if(this.auth.getAccessToken() && !localStorage.getItem("token") && !localStorage.getItem("login")){
      localStorage.setItem("login","ok")
      var loginrequest =  new OauthLoginRequest(localStorage.getItem("provideID")+"", this.auth.getAccessToken(),this.auth.getAccessTokenExpiration());
      this.loginservice.oauthLogin(loginrequest);
    }
    else if(this.auth.getAccessToken()){
     
      this.router.navigate(["/"])
    }
  }
 
  
 
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginservice.login(new LoginRequest(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value));
      
    }
  }
  loginWithGoogle(){
     localStorage.removeItem("login")
    this.loginservice.loginWithGoogle();
    localStorage.setItem("provideID","google")
  }

}
