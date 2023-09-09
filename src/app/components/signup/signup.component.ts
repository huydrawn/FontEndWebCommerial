import { Component, DoCheck } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterRequest } from 'src/app/models/register-request';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements DoCheck {
  registerForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private registerService: RegisterService, private router: Router) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  ngDoCheck(): void {

    if (this.loginService.isLoggin()) {
      this.router.navigate(["/"])
    }
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'notMatch': true } : null;
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register(new RegisterRequest(this.registerForm.controls["username"].value, this.registerForm.controls["password"].value
        , this.registerForm.controls["email"].value));
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
