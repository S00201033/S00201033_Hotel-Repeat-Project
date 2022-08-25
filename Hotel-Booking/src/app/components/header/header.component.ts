import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Server } from 'http';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private route: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  goHome(){
    this.route.navigateByUrl('/')
  }
  public get identity() {
    return JSON.parse(localStorage.getItem('userData')!)
  }
  logout() {
    localStorage.removeItem('authenticatedByLoginToken')
    localStorage.removeItem('userData')
    this.route.navigateByUrl('/login')
    this.loginService.SignOut()
  }

}
