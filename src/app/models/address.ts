export class Address {
      country : string;
	  city : string;
	  provide : string;
	  details : string;
    constructor(ct:string, cy:string,pd:string,dt:string){
        this.country = ct;
        this.city = cy;
        this.provide = pd;
        this.details = dt;
    }
}
