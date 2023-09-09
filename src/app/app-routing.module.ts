import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { SinginComponent } from './components/singin/singin.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorPageNotVertificationComponent } from './components/error-page/error-page.component';
import { MainPageComponent } from './components/seller/main-page/main-page.component';
const routes: Routes = [{ path: '', component: MainComponent }, { path: 'seller', component: MainPageComponent }, { path: 'error-page', component: ErrorPageNotVertificationComponent }, { path: 'profile', component: ProfileComponent }, { path: 'upload', component: UploadfileComponent }, { path: 'search', component: SearchPageComponent }, { path: 'signup', component: SignupComponent }, { path: 'signin', component: SinginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
