import { AfterContentInit, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateUser } from 'src/app/models/dto/user/update-user';
import { User } from 'src/app/models/user';
import { ConvertService } from 'src/app/services/convert.service';
import { DecodeService } from 'src/app/services/decode.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements DoCheck {
  userService: UserService;
  avatar: File | undefined;
  avatarImage: string | undefined
  
  radioOptions = [
    { label: 'nam', value: 'Nam' },
    { label: 'nữ', value: 'Nữ' },
    { label: 'khác', value: 'Khác' },

  ];
  constructor(private toastr: ToastrService, userService: UserService, private decode: DecodeService, private convert: ConvertService) {
    this.userService = userService;
  }
  ngDoCheck(): void {
    if(!this.avatarImage){
      this.avatarImage =  this.userService.getAvatar();
    }
  }
  
  save() {
    if(!this.avatar){
      this.userService.updateUser(this.userService.user!);
    }
    else{
    this.decode.encodeFileToBase64(this.avatar!, (base64String: string) => {
      this.userService.user!.avatar = base64String;
      this.userService.updateUser(this.userService.user!);
    });}

  }

  selectAvatar(event: any): void {
    this.avatar = this.onFileSelected(event);
    if(this.avatar != undefined){
      this.avatarImage = URL.createObjectURL(this.avatar);
      
    }
    else{
      this.avatarImage = this.userService.getAvatar();
    }

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      
      return file;
      
    }
    return '';
  }


}


