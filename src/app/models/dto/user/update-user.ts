export class UpdateUser {

    name: string;
    birth_day: Date;
    gender: string;
    numberPhone: string;
    avatar: string;
    constructor(name: string,
        birth_day: Date,
        gender: string,
        numberPhone: string,
        avatar: string) {
        this.name = name;
        this.birth_day = birth_day;
        this.gender = gender;
        this.numberPhone = numberPhone;
        this.avatar = avatar;
    }
}

