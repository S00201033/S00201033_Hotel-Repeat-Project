import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomManagmentService {

  constructor(
    public afs: AngularFirestore, ) { }

  getRoomsList() {
    const roomsRef: AngularFirestoreCollection<any> = this.afs.collection(
      `Rooms`
    );
    return roomsRef.get();
  }

  addNewRoom(data:any){
    const roomRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Rooms/${data.roomId}`
    );

    return roomRef.set(data, {
      merge: true,
    })

  }

  deleteRoom(roomId:any){
    const roomRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Rooms/${roomId}`
    );

    return roomRef.delete()

  }

  createBooking(data:any){
    return this.afs.collection("Rooms").doc(data.roomId).collection("Bookings").doc(data.bookingId).set(data)
  }

  getUserBookings(userId:any){
    return this.afs.collectionGroup('Bookings',
      ref => ref.where('userId', '==', userId))
    .get()
  }

  geAllBookings(){
    return this.afs.collectionGroup('Bookings').get()
  }

  deleteBookingById(data:any){
    return this.afs.collection("Rooms").doc(data.roomId).collection("Bookings").doc(data.bookingId).delete()
  }
  filterBookings(date:any){
    return this.afs.collectionGroup('Bookings',
      ref => ref.where('fromDate', '!=', date))
    .get()
  }
}
