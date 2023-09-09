import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-error-page-not-vertification',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageNotVertificationComponent {
  accountStatus: string;
  constructor(private loginService: LoginService) {
    this.accountStatus = this.loginService.statusAccount!;
  }

}
