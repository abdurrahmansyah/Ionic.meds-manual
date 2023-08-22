import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { GlobalService, LogData, UserData } from './global.service';
import { Observable } from 'rxjs';
import { doc, setDoc, Firestore, getFirestore, collection, collectionData, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public userDataListCollection: AngularFirestoreCollection<UserData>;
  public logDataListCollection: AngularFirestoreCollection<LogData>;
  public userDataList: Observable<UserData[]>;

  constructor(
    private firestore: Firestore,
    private afs: AngularFirestore,
    private globalService: GlobalService) {
    this.userDataListCollection = this.afs.collection<UserData>('users', ref => ref.orderBy('nama'));
    this.logDataListCollection = this.afs.collection<LogData>('logs');
    this.userDataList = this.userDataListCollection.valueChanges({ idField: 'id' });
    this.userDataList.subscribe(userDataList => {
      this.globalService.userDataList = userDataList;
    });
  }

  // getNotes() {
  //   const notesRef = collection(this.firestore, 'notes');
  //   return collectionData(notesRef);
  // }

  // getUsers(): Observable<UserData[]> {
  //   const userColl = collection(this.firestore, 'users');
  //   return collectionData(userColl) as Observable<UserData[]>;
  // }

  // getUserById(id: string): Observable<UserData> {
  //   const userDoc = doc(this.firestore, `users/${id}`);
  //   return docData(userDoc, { idField: 'id' }) as Observable<UserData>;
  // }

  // addUser(userData: UserData) {
  //   const userColl = collection(this.firestore, 'users');
  //   return addDoc(userColl, userData);
  // }

  // deleteUser(userData: UserData) {
  //   const userDoc = doc(this.firestore, `users/${userData.id}`);
  //   return deleteDoc(userDoc);
  // }

  // updateUser(userData: UserData) {
  //   const userDoc = doc(this.firestore, `users/${userData.id}`);
  //   return updateDoc(userDoc, {
  //     email: userData.email,
  //     nama: userData.nama,
  //     tglLahir: userData.tglLahir,
  //     profesi: userData.profesi,
  //     photo: userData.photo,
  //     lampiran: userData.lampiran,
  //     isAdmin: userData.isAdmin,
  //   });
  // }
}
