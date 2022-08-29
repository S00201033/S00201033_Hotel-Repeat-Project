import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomManagmentService } from 'src/app/services/room-managment.service';
import firebase from 'firebase/compat/app';



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

  newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0", imageUrl:""}

  percentage: number = 0;



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

    this.uploadImage(this.fileToUpload).then((imgUrl:any) => {
      this.newRoomData.imageUrl = imgUrl
      this.roomManagmentService.addNewRoom(this.newRoomData).then(resp => {
        this.tableData.push(this.newRoomData)
        this.newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0", imageUrl:""}
        alert("Successfully Added Room")
      }).catch(err => {
        alert("Failed to Add Room")
      })

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
    this.newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0", imageUrl:""}
  }
  updateRoomDetail(){

    this.roomManagmentService.addNewRoom(this.newRoomData).then(resp => {
      this.tableData.splice(this.tableData.findIndex(x => x.roomId == this.newRoomData.roomId),1)
      this.tableData.push(this.newRoomData)
      this.newRoomData = {title:null, size:null, rentPerDay:0, location:null, description:null, class:null, roomId:"0", imageUrl:""}
      alert("Successfully Updated Room")
    }).catch(err => {
      alert("Failed to Update Room")

    })
  }
  deleteRoom(room:any){
    this.roomManagmentService.deleteRoom(room.roomId).then(resp => {
      this.tableData.splice(this.tableData.findIndex(x => x.roomId == room.roomId),1)
      if(room.imageUrl){
        this.deleteImage(room.imageUrl)
      }
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
  getRoomImageById(roomId:any){
    return this.roomsList.find(r => r.roomId == roomId)?.imageUrl ?? "/assets/roomB.webp"
  }

  deleteBooking(data:any){
    this.roomManagmentService.deleteBookingById(data).then(resp => {
      this.tableData2.splice(this.tableData2.findIndex(x => x.roomId == data.bookingId),1)
      alert("Successfully Deleted Booking")
    }).catch(err => {
      alert("Failed to Delete Booking")

    })
  }
  fileToUpload:any
  upload($event:any) {
    this.fileToUpload = $event.target.files[0]
    console.log("length ", this.fileToUpload)

  }



  async uploadImage(image:any) {
    return new Promise((resolve, reject) => {
      const filename = Math.floor(Date.now() / 1000);
      var storageRef: any = firebase
        .storage()
        .ref('images/')
        .child(`image` + filename + image.name);

      const uploadTask = storageRef.put(image);

      uploadTask.on(
        "state_changed",
        (snapshot:any) => {
          this.percentage = parseInt(
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString()
          );
          console.log("progress: ", this.percentage);
        },
        (err:any) => {
          console.log("erron upload: ", err);
        },
        () => {
          // on complete
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL:string) {
            console.log("download url", downloadURL);
            resolve(downloadURL)
          });
        }
      );
    })

  }
  deleteImage(imageUrl:any) {
    return new Promise((resolve, reject) => {
      firebase
        .storage().refFromURL(imageUrl).delete()
        .then(res => {
          console.log("deleted image")
          resolve(res)
        })
        .catch(err => {
          console.log("not deleted image")
          reject(err)
        })
    })
  }

}

