import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomManagmentService } from 'src/app/services/room-managment.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  roomsList: any[] = []

  constructor(private roomManagmentService: RoomManagmentService,
    private router: Router) { }

  ngOnInit(): void {
    this.getRoomsList()
  }

  getRoomsList(){
    return this.roomManagmentService.getRoomsList().subscribe((resp:any) => {

      resp.forEach((element:any) => {
        this.roomsList.push(element.data())
      });
      console.log("rooms respnse", this.roomsList)
    })
  }

  goToCreateBooking(roomId:any){
    let isLoggedIn = localStorage.getItem('userData')
    if(!isLoggedIn){
      this.router.navigate(['login'])
      return
    }
    this.router.navigate(['create/'+roomId])
  }

}
