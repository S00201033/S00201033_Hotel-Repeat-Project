import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:string = ''
  firstName:string = ''
  lastName:string = ''
  email:string = ''
  mobileNo:string = ''
  dateOfBirth:string = ''
  password:string = ''
  isFormValid = false
  defaultCheck1 = false

  loginForm!: FormGroup;
  constructor(private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private spinnerService: NgxSpinnerService,) { }

  ngOnInit(): void {
  }

  get isFormValidd(){
    if(this.firstName.length > 0 && this.lastName.length > 0 && this.email.length > 0 && this.password.length > 0){
      this.isFormValid = true;
    }else{
      this.isFormValid = false
    }
    return this.isFormValid
  }


  signup() {
    let detail = {
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNo,
      dateOfBirth: this.dateOfBirth,
      role: 'client'
    }
    this.spinnerService.show()
    this.loginService.signup(detail).then((response:any)=>{
      this.spinnerService.hide()
      console.log(response)
      localStorage.setItem('userData',JSON.stringify(response))
      this.router.navigate([''])

    },(error)=> {
      this.spinnerService.hide()
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          this.toastr.error("Error Event");
        } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
                case 404:     //forbidden
                this.toastr.error('404', 'Failed');
                    break;
                case 500:     //forbidden
                this.toastr.error(error.error.detail, 'Failed');
                    break;
                case 0:     //forbidden
                this.toastr.error('Server Connection Error', 'Registration Failed');
                    break;
            }
        }
    } else {
      this.spinnerService.hide()
      this.toastr.error('Something went wrong', 'Contact Support')
    }
    })

  }
  public  jwtHelper = new JwtHelperService();

  public decodeToken(): any {
    const token = JSON.parse(localStorage.getItem('authenticatedByLoginToken') || "")
    if (!token) {
      return {}
    }
    let decodedToken = this.jwtHelper.decodeToken(token)
    return decodedToken
   }
}
