import { Component, ComponentFactoryResolver, ComponentRef, DoCheck, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SearchPageComponent } from '../../search-page/search-page.component';
import { AllProductSellComponent } from '../all-product-sell/all-product-sell.component';
import { AddSellProductComponent } from '../add-sell-product/add-sell-product.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements DoCheck {
   
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef | undefined;
  show:boolean[]=[];
  userService:UserService;
  searchPageComponent:any[] = [AllProductSellComponent,AddSellProductComponent];
  change(index:number){
    if(this.show[index]==true){
    this.show[index] = false;}
    else{
      this.show[index] = true;
    }

  }
  
  constructor(  userService : UserService,private loginService:LoginService,private componentFactoryResolver: ComponentFactoryResolver){
    this.userService = userService;
  }
  
  ngDoCheck(): void {
   if(!this.loginService.isLoggin()){
    localStorage.setItem("rebackURL","/seller")
    this.loginService.gotoLogin();
   }
  }
  insertComponent(componentType: any): void {
    if (this.content) {
       // Tạo một factory cho component
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    // Tạo một instance của component
    const componentRef = factory.create(this.content.parentInjector);

    // Chèn component vào ViewContainerRef
    this.content.clear(); // Xóa nếu đã có component trong container
    this.content.insert(componentRef.hostView);
    }
  }  

}
