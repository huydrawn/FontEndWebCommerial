import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Response } from './models/response';
import { TimmerService } from './services/timmer.service';
import { UserService } from './services/user.service';
import { JwtToken } from './models/jwt-token';
import { ProductTypeService } from './services/product-type.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-root',
  template:`<highcharts-chart 
  [Highcharts]="Highcharts"

  [constructorType]="chartConstructor"
  [options]="chartOptions"
  [callbackFunction]="chartCallback"

  [(update)]="updateFlag"
  [oneToOne]="oneToOneFlag"
  [runOutsideAngular]="runOutsideAngular"

  style="width: 100%; height: 400px; display: block;"
></highcharts-chart>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(private timmer: TimmerService, private loginService: LoginService, private userService: UserService , private productTypeService:ProductTypeService) { }
  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.userService.loadUser();
    }
    this.productTypeService.load();
  }
  ngOnDestroy(): void {
    this.timmer.resetTimer();
  }
  @HostListener('click', ['$event'])
  onInteraction(event: MouseEvent) {
    if (localStorage.getItem("token")) {
      const jwtToken = JSON.parse(localStorage.getItem("token") as string) as JwtToken;
      this.timmer.refreshToken(jwtToken.expried)
    }
    this.timmer.startTimer(15, () => {
      this.loginService.logout();
    })
  }

  title = 'CommercialWebApp';
}
