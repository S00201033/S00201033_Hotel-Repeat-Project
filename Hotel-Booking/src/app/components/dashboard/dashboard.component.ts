import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomManagmentService } from 'src/app/services/room-managment.service';



export interface BookingsData {
  bookingType: string;
  dateAndTime: string;
  bookingRecordID: number;
  description: string;
  location: string;
  witnessName: string;
  witnessContact:string;
}





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
selectedFile=null;
  OnFileSelected(event: any){
    this.selectedFile=event.target.files[0];
  }

  dtOptions: DataTables.Settings = {};

  tableData!: any[]

  tableData2!: any[]

  roomsList: any[] = []

  bookingList: any[] = []

  newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0",imgUrl:null}



  constructor(private roomManagmentService: RoomManagmentService,
    private router: Router) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 12,
        processing: true
      };
    }


  ngOnInit(): void {
    this.getRoomsList()
    this.getAllBookings()

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


  addNewRoom(){
    this.newRoomData.roomId = this.getID()

    this.roomManagmentService.addNewRoom(this.newRoomData).then(resp => {
      this.tableData.push(this.newRoomData)
      this.newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0", imgUrl:null}
      alert("Successfully Added Room")
    }).catch(err => {
      alert("Failed to Add Room")

    })
  }

  getID() {
    let date = new Date();
    return 'id' + date.getTime();
  }

  openEditRoomModal(data:any){
    Object.assign(this.newRoomData, data)
  }

  closeEditRoomModal(){
    this.newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0",imgUrl:null}
  }
  updateRoomDetail(){

    this.roomManagmentService.addNewRoom(this.newRoomData).then(resp => {
      this.tableData.splice(this.tableData.findIndex(x => x.roomId == this.newRoomData.roomId),1)
      this.tableData.push(this.newRoomData)
      this.newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0",imgUrl:null}
      alert("Successfully Updated Room")
    }).catch(err => {
      alert("Failed to Update Room")

    })
  }

  deleteRoom(roomId:any){
    this.roomManagmentService.deleteRoom(roomId).then(resp => {
      this.tableData.splice(this.tableData.findIndex(x => x.roomId == roomId),1)
      alert("Successfully Deleted Room")
    }).catch(err => {
      alert("Failed to Delete Room")

    })
  }

  getAllBookings(){
    this.roomManagmentService.geAllBookings().subscribe((resp:any) => {

      resp.forEach((element:any) => {
        this.bookingList.push(element.data())
      });
      this.tableData2 = this.bookingList
      console.log("bookngs List ", this.bookingList)
    })
  }

  getRoomTitleById(roomId:any){
    return this.roomsList.find(r => r.roomId == roomId)?.title ?? "Room deleted"
  }

  deleteBooking(data:any){
    this.roomManagmentService.deleteBookingById(data).then(resp => {
      this.tableData2.splice(this.tableData2.findIndex(x => x.roomId == data.bookingId),1)
      alert("Successfully Deleted Booking")
    }).catch(err => {
      alert("Failed to Delete Booking")

    })
  }


}

