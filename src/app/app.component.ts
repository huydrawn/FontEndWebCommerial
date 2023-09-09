import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Response } from './models/response';
import { TimmerService } from './services/timmer.service';
import { UserService } from './services/user.service';
import { JwtToken } from './models/jwt-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy,OnInit {
  constructor(private timmer :TimmerService , private loginService:LoginService , private userService:UserService){}
  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.userService.loadUser();
    }
  }
  ngOnDestroy(): void {
    this.timmer.resetTimer();
  }
  @HostListener('click', ['$event'])
  onInteraction(event: MouseEvent) {
    const jwtToken = JSON.parse(localStorage.getItem("token") as string) as JwtToken; 
    console.log("at app components")
    this.timmer.refreshToken(jwtToken.expried)
    this.timmer.startTimer(15,()=>{
      this.loginService.logout();
    })
  }

  title = 'CommercialWebApp';
}
