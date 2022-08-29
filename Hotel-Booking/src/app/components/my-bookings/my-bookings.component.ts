import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoomManagmentService } from 'src/app/services/room-managment.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  OnFileSelected(event: any){
    console.log(event);
  }

  dtOptions: DataTables.Settings = {};

  tableData: any[] = []

  bookingList: any[] = []

  roomsList: any[] = []

  currentUser: any
  updateBookingData = {
    bookingId: "0",
    roomId: "0",
    userId: null,
    fromDate: null,
    toDate: null
  }


  constructor(private roomManagmentService: RoomManagmentService,
    private toastr: ToastrService,) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 12,
      processing: true
    };

  }

  ngOnInit(): void {
    // this.getUserBookings()
    this.getRoomsList()
    this.currentUser = JSON.parse(localStorage.getItem("userData") ?? "")
    this.getAllBookings()
  }

  getUserBookings(){
    let userId = JSON.parse(localStorage.getItem("userData") ?? "")
    this.roomManagmentService.getUserBookings(userId).subscribe(resp => {
      console.log("user bookings ", resp)
    }, err => {
      console.log("erro bookings", err)
    })
  }

  getAllBookings(){
    this.roomManagmentService.geAllBookings().subscribe((resp:any) => {

      resp.forEach((element:any) => {
        this.bookingList.push(element.data())
      });
      this.tableData = this.bookingList.filter(b => b.userId == this.currentUser.email)
      console.log("bookngs List ", this.tableData)
    })
  }

  getRoomsList(){
    this.tableData = []
    return this.roomManagmentService.getRoomsList().subscribe((resp:any) => {

      resp.forEach((element:any) => {
        this.roomsList.push(element.data())
      });
      this.tableData = this.roomsList
    })
  }

  getRoomTitleById(roomId:any){
    return this.roomsList.find(r => r.roomId == roomId)?.title ?? "Room deleted"
  }

  getRoomImageById(roomId:any){
    return this.roomsList.find(r => r.roomId == roomId)?.imageUrl ?? "/assets/roomB.webp"
  }

  openBookingUpdateModel(){

  }

  openEditBookingModel(data:any){
    Object.assign(this.updateBookingData, data)
  }

  closeEditBookingModel(){
    this.updateBookingData = {
      bookingId: "0",
      roomId: "0",
      userId: null,
      fromDate: null,
      toDate: null
    }
  }

  updateBooking(){
    let data = {
      bookingId: this.updateBookingData.bookingId,
      roomId: this.updateBookingData.roomId,
      userId: this.currentUser.email,
      fromDate: this.updateBookingData.fromDate,
      toDate: this.updateBookingData.toDate
    }

    this.roomManagmentService.createBooking(data).then(resp => {
      console.log("resp booking ", resp)
      this.tableData.splice(this.tableData.findIndex(x => x.roomId == this.updateBookingData.roomId),1)
      this.tableData.push(this.updateBookingData)
      this.updateBookingData = {bookingId: "0", roomId: "0", userId: null, fromDate: null, toDate: null}
      this.toastr.success("updated booking","Successfully")
    }).catch(err =>{
      console.log("error booking ", err)
    })

  }

  deleteBooking(data:any){
    this.roomManagmentService.deleteBookingById(data).then(resp => {
      this.tableData.splice(this.tableData.findIndex(x => x.roomId == data.bookingId),1)
      alert("Successfully Deleted Room")
    }).catch(err => {
      alert("Failed to Delete Room")

    })
  }

}
