export class ProductTypeUpdate {
    name:string;
    images:File[];
    constructor(name:string,images:File[]){
        this.name = name;
        this.images = images;
    }
}
