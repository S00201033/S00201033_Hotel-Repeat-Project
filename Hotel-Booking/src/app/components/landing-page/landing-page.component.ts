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
  displayRoomsList: any[] = []

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
      this.displayRoomsList = this.roomsList
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
  search(selectedDate:any){
    console.log("selected date ", selectedDate)
    if(!selectedDate){
      this.displayRoomsList = this.roomsList
      return

    }

    this.roomManagmentService.geAllBookings().subscribe(resp => {
      let bookings: any[] = []
      resp.forEach((element:any) => {
        bookings.push(element.data())
      });
      console.log("bookings ", bookings)
      let ids = [...new Set(bookings.filter(b => b.fromDate >= selectedDate || b.toDate <= selectedDate).map(x => x.roomId))]
      console.log("ids ", ids)
      this.displayRoomsList = this.roomsList.filter(r => ids.includes(r.roomId))

    })

  }

}
