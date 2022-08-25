import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HotleRoomBooking';
  showHeaderFooter = true

  constructor(private router: Router, private login: LoginService){

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
   if(event.url =='/register' || event.url == '/login' ) {
        this.showHeaderFooter = false
      }else {
        this.showHeaderFooter = true
        }
      }
    );


    }


}
