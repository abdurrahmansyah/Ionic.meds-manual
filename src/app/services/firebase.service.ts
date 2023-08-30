import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { GlobalService, LogData, TriaseData, UserData } from './global.service';
import { Observable } from 'rxjs';
import { doc, setDoc, Firestore, getFirestore, collection, collectionData, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';

export interface Category {
  idx?: string;
  id: number;
  data: string;
  title: string;
}

export interface SubCategory {
  idx?: string;
  id: number;
  type: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public userDataListCollection: AngularFirestoreCollection<UserData>;
  public logDataListCollection: AngularFirestoreCollection<LogData>;
  public userDataList: Observable<UserData[]>;

  public triaseDataListCollection: AngularFirestoreCollection<Category>;
  public triaseDataList: Observable<Category[]> | undefined;
  public masterDataList: Observable<Category[]> | undefined;

  constructor(
    private firestore: Firestore,
    private afs: AngularFirestore,
    private globalService: GlobalService) {
    this.userDataListCollection = this.afs.collection<UserData>('users', ref => ref.orderBy('nama'));
    this.logDataListCollection = this.afs.collection<LogData>('logs');

    this.triaseDataListCollection = this.afs.collection<Category>('triase', ref => ref.orderBy('id'));

    this.userDataList = this.userDataListCollection.valueChanges({ idField: 'id' });

    this.userDataList.subscribe(userDataList => {
      // console.log(userDataList);
      // var data = userDataList.find(x => x);
      // console.log(data);
      // console.log(data?.email);
      // console.log(data?.id);


      // this.globalService.userDataList = userDataList;
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
