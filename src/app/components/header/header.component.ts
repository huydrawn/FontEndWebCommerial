import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConvertService } from 'src/app/services/convert.service';
import { DecodeService } from 'src/app/services/decode.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userService:UserService;
  showMenu = false;
  
  constructor(private userservie: UserService, private loginservice: LoginService, private decode: DecodeService, private convert: ConvertService) {
    this.userService = userservie;
    }
  isLoggin(): boolean {
    return localStorage.getItem("token") ? true : false;
  }
  logout() {
    this.loginservice.logout();
  }
}
