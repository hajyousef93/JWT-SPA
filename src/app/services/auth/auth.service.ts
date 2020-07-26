import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/register-model';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/login-model';
import { ResetPasswordModel } from 'src/app/models/reset-password-model';
import { UserModel } from 'src/app/models/user-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fb: FormBuilder, private http: HttpClient ,private router:Router) { }
  readonly BaseURI = 'http://localhost:54970/';
  
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + 'Account/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + 'Account/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + 'UserProfile');
  }
  getNameTest(){
    return this.http.get(this.BaseURI+'UserProfile/GetNameAuth')
  }
  isLogin(){
    if(localStorage.getItem('token')!=null)
    return true;
  }
  getToken() {
    return localStorage.getItem("token");
  }
  userLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login'])
  }
}
