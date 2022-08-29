import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoomManagmentService } from 'src/app/services/room-managment.service';

@Component({
  selector: 'app-create-booking-page',
  templateUrl: './create-booking-page.component.html',
  styleUrls: ['./create-booking-page.component.css']
})
export class CreateBookingPageComponent implements OnInit {

  
  token: string|undefined;
  bookingType!: string;
  dateTime!: string;
  witnessName!: string;
  witnessContact!: string;
  location!: string
  description!: string
  roomId!: string | null
  currentUserId!: string | null
  fromDate!: string
  toDate!: string

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private roomManagmentService: RoomManagmentService) { }

  ngOnInit(): void {
    this.roomId = this.activeRoute.snapshot.paramMap.get('roomId')
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    

    console.debug(`Token [${this.token}] generated`);
  }

  createBooking(){
    this.currentUserId = JSON.parse(localStorage.getItem("userData") ?? " ").email
    let data = {
      bookingId: this.getID(),
      roomId: this.roomId,
      userId: this.currentUserId,
      fromDate: this.fromDate,
      toDate: this.toDate
    }
    this.roomManagmentService.createBooking(data).then((resp: any) => {
      console.log("resp booking ", resp)
      this.router.navigate(['my-bookings'])
      this.toastr.success("created booking","Successfully")
    }).catch((err: any) =>{
      console.log("error booking ", err)
    })

  }
  getID() {
    let date = new Date();
    return 'id' + date.getTime();
  }

}

