import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  page = 'signinPage'
  username:string = ''
  firstName:string = ''
  lastName:string = ''
  email:string = ''
  mobileNo:string = ''
  dateOfBirth:string = ''
  password:string = ''
  invalidValidLoginAttempt = false
  public  jwtHelper = new JwtHelperService();
  constructor(private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService) { }

  ngOnInit(): void {
    let isLoggedIn = this.authService.isLoggedIn()
    if(isLoggedIn == true){
      this.router.navigateByUrl('/')
    }

  }

  switchPage(){
    if(this.page == 'signupPage'){
      this.page = 'signinPage'
    }else{
      this.page = 'signupPage'
    }
  }
  signin() {
    let detail = {
      email: this.email,
      password: this.password
    }
    this.spinnerService.show()
    this.loginService.login(detail).then((response:any)=>{
      console.log("userData ", response.data())
      localStorage.setItem('userData',JSON.stringify(response.data()))
      this.spinnerService.hide()

      if(response.data().role == 'admin'){
        this.router.navigateByUrl('dashboard')

      }else{
        this.router.navigateByUrl('/')

      }


    }).catch((error:any)=>{
      this.invalidValidLoginAttempt = true
      this.spinnerService.hide()
      console.log(error)


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
                this.toastr.error('Server Connection Error', 'Login Failed');
                    break;
            }
        }
    } else {
      this.spinnerService.hide()
      this.toastr.error('Something went wrong', 'Contact Support')
    }
    })

  }
  userData(email:any) {
    // this.loginService.getProfile(email).subscribe((response)=>{
    //   console.log('userData',response)
    //   localStorage.setItem('userData',JSON.stringify(response))
    //   this.router.navigateByUrl('/')

    // })
  }

 
}
