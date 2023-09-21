import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, DoCheck, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SearchPageComponent } from '../../search-page/search-page.component';
// import { AllProductSellComponent } from '../all-product-sell/all-product-sell.component';
import { AddSellProductComponent } from '../add-sell-product/add-sell-product.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { HomePageComponent } from '../home-page/home-page.component';
import { AllProductSellComponent } from '../all-product-sell/all-product-sell.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements DoCheck,AfterViewInit {

  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef | undefined;
  show: boolean[] = [];
  userService: UserService;
  currentPath: string[] = ["Trang Chủ"];

   searchPageComponent: { namePath: string, component: any }[] = [{ namePath: "Tất Cả Sản Phẩm", component: AllProductSellComponent }, { namePath: "Thêm Sản Phẩm", component: AddSellProductComponent }];
  change(index: number) {
    if (this.show[index] == true) {
      this.show[index] = false;
    }
    else {
      this.show[index] = true;
    }

  }

  constructor(userService: UserService, private loginService: LoginService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.userService = userService;
  }
  ngAfterViewInit(): void {
   this.checkForHomePage(0);
  }

  ngDoCheck(): void {
    if (!this.loginService.isLoggin()) {
      localStorage.setItem("rebackURL", "/seller")
      this.loginService.gotoLogin();
    }
  }
  insertComponent(componentType: { namePath: string, component: any }, indexPath: number): void {
    this.currentPath.splice(1, this.currentPath.length - 1)
    if (this.content) {
      // Tạo một factory cho component
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType.component);

      // Tạo một instance của component
      const componentRef = factory.create(this.content.parentInjector);

      // Chèn component vào ViewContainerRef
      this.content.clear(); // Xóa nếu đã có component trong container
      this.content.insert(componentRef.hostView);
      this.currentPath.push(componentType.namePath)
      
    }

  }
  checkForHomePage(index: number) {
    if (index == 0) {
      if (this.content) {
        this.currentPath.splice(1, this.currentPath.length - 1)
        // Tạo một factory cho component
        const factory = this.componentFactoryResolver.resolveComponentFactory(HomePageComponent);
  
        // Tạo một instance của component
        const componentRef = factory.create(this.content.parentInjector);
  
        // Chèn component vào ViewContainerRef
        this.content.clear(); // Xóa nếu đã có component trong container
        this.content.insert(componentRef.hostView);
      }
    }

  }

}
