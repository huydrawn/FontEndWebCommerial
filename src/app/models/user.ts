import { Address } from "./address";

export class User {
      userName : string;
	  name : string;
	  birth_day:Date;
	  email:string;
      gender:string;
	  numberPhone:string;
	  avatar:string;
    constructor(userName:string,name:string,birth_day:Date,email:string,gender:string,numberPhone:string,avatar:string){
        this.userName = userName;
        this.name=name;
        this.birth_day=birth_day;
        this.email=email;
        this.gender=gender;
        this.numberPhone = numberPhone;
        this.avatar=avatar;
    }
}
