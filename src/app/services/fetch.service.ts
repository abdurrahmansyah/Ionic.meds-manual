import { Injectable } from '@angular/core';
import { InjectorInstance } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { dataTemp } from '../dataTemp';
import { ContentData, UserData } from './global.service';
import { Auth } from '@angular/fire/auth';

// export interface FireUserData {
//   fire_user_id?: number,
//   email: string,
//   nama: string,
//   tglLahir: string,
//   profesi: string,
//   lampiran: string,
//   photo?: string,
//   isAdmin: boolean
// }

// export interface ContentData {
//   id?: string,
//   employee_id: string,
//   date: string,
//   code_id: string,
//   book_datetime: string,
//   description: string,
//   status: string
// }

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  httpClient = InjectorInstance.get<HttpClient>(HttpClient);

  constructor(public http: HttpClient,
    private auth: Auth) { }

  async GetContents(): Promise<ContentData> {
    const res: any = await new Promise(resolve => {
      this.GetObsContents().subscribe(data => {
        resolve(data);
      });
    });

    // if (resSeat.response == 'failed') throw (resSeat.data);
    return res.data;
  }

  GetObsContents() {
    return this.httpClient.get(dataTemp.url.getContents);
  }

  GetContentsbyId(content_id: number) {
    return this.httpClient.post(dataTemp.url.getContentsbyId, { 'content_id': content_id });
  }

  getContentsbyName(parent_name: string) {
    return this.httpClient.post(dataTemp.url.getContentsbyName, { 'parent_name': parent_name });
  }

  CreateContent(contentData: ContentData) {
    return this.httpClient.post(dataTemp.url.createContent, contentData);
  }

  UpdateSeat(contentData: UserData) {
    return this.httpClient.post(dataTemp.url.updateContent, contentData);
  }

  GetFireUsers() {
    return this.httpClient.get(dataTemp.url.getFireUsers);
  }

  GetFireUsersbyId(fire_user_id: number) {
    return this.httpClient.post(dataTemp.url.getFireUsersbyId, { 'fire_user_id': fire_user_id });
  }

  GetFireUsersbyEmail(email: string) {
    return this.httpClient.post(dataTemp.url.getFireUsersbyEmail, { 'email': email });
  }

  CreateFireUser(userData: UserData) {
    return this.httpClient.post(dataTemp.url.createFireUser, userData);
  }

  UpdateFireUser(userData: UserData) {
    return this.httpClient.post(dataTemp.url.updateFireUser, userData);
  }

  public async getUserProfile() {
    const user = this.auth.currentUser;

    const res: any = await new Promise(resolve => {
      this.GetFireUsersbyEmail(user?.email!).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data profile');
    return res.data.find((x: any) => x);

    // const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    // const userDocRef = doc(this.firestore, `users/${user?.email}`);
    // return docData(userDocRef);
  }

}
