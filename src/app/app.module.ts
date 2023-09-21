import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModue for the button
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule for the tooltip

import { SearchPageComponent } from './components/search-page/search-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './components/signup/signup.component';
import { SinginComponent } from './components/singin/singin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtinterceptorsService } from './service/jwtinterceptors.service';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { MatMenuModule } from '@angular/material/menu';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatRadioModule } from '@angular/material/radio';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorPageNotVertificationComponent } from './components/error-page/error-page.component';
import { MainPageComponent } from './components/seller/main-page/main-page.component';
import { MatTreeModule } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { AllProductSellComponent } from './components/seller/all-product-sell/all-product-sell.component';
import { AddSellProductComponent } from './components/seller/add-sell-product/add-sell-product.component';
import { HomePageComponent } from './components/seller/home-page/home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProductComponent } from './components/seller/edit-product/edit-product.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DetailProductComponent } from './components/detail-product/detail-product.component';




@NgModule({
  declarations: [

    AppComponent,
    MainComponent,
    SearchPageComponent,
    SignupComponent,
    SinginComponent,
    UploadfileComponent,
    ProfileComponent,
    HeaderComponent,
    ErrorPageNotVertificationComponent,
    MainPageComponent,
    AllProductSellComponent,
    AddSellProductComponent,
    HomePageComponent,
    EditProductComponent,
    DetailProductComponent,
    

  ],
  imports: [
    HighchartsChartModule ,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    HttpClientModule,
    MatTreeModule,
    MatButtonModule, // Add MatButtonModule
    MatTooltipModule,// Add MatTooltipModule
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ToastrModule.forRoot({ 
      positionClass: 'toast-top-right',}),
    OAuthModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorsService, multi: true }, provideAnimations(), // required animations providers
  provideToastr()],
  bootstrap: [AppComponent]
})
export class AppModule { }
