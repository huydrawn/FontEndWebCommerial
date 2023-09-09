export class JwtToken {
    token:string;
    expried:Date;
    constructor(token:string,expried:Date){
        this.token = token;
        this.expried = expried;
    }
}
