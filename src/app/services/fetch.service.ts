import { Injectable } from '@angular/core';
import { InjectorInstance } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { dataTemp } from '../dataTemp';
import { ContentData, FireUserData, SubscriptionData, TransactionData } from './global.service';
import { Auth } from '@angular/fire/auth';
import { charge } from './midtrans.service';

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

   //#region content
   getContents() {
    return this.httpClient.get(dataTemp.url.getContents);
  }

  getContentsbyId(content_id: number) {
    return this.httpClient.post(dataTemp.url.getContentsbyId, { 'content_id': content_id });
  }

  private getContentsbyName(parent_name: string) {
    return this.httpClient.post(dataTemp.url.getContentsbyName, { 'parent_name': parent_name });
  }

  private getContentbyData(data: string) {
    return this.httpClient.post(dataTemp.url.getContentbyData, { 'data': data });
  }

  private searchContentsbyData(data: string) {
    return this.httpClient.post(dataTemp.url.searchContentsbyData, { 'data': data });
  }

  createContent(contentData: ContentData) {
    return this.httpClient.post(dataTemp.url.createContent, contentData);
  }

  updateContent(contentData: ContentData) {
    return this.httpClient.post(dataTemp.url.updateContent, contentData);
  }
  //#endregion

  //#region fire user
  getFireUserSummary() {
    return this.httpClient.get(dataTemp.url.getFireUserSummary);
  }

  getFireUsers(status?: string) {
    return this.httpClient.post(dataTemp.url.getFireUsers, status ? { 'status': status } : {});
  }

  getFireUsersLimit(limit: number, page: number, status?: string) {
    return this.httpClient.post(dataTemp.url.getFireUsersLimit, status ? { 'limit': limit, 'page': page, 'status': status } : { 'limit': limit, 'page': page });
  }

  searchFireUsersLimit(data: string, limit: number, page: number, status?: string) {
    return this.httpClient.post(dataTemp.url.searchFireUsersLimit, status ? { 'data': data, 'limit': limit, 'page': page, 'status': status } : { 'data': data, 'limit': limit, 'page': page });
  }

  getFireUsersbyId(fire_user_id: number) {
    return this.httpClient.post(dataTemp.url.getFireUsersbyId, { 'fire_user_id': fire_user_id });
  }

  getFireUsersbyEmail(email: string) {
    return this.httpClient.post(dataTemp.url.getFireUsersbyEmail, { 'email': email });
  }

  getFireUsersLogin(email: string) {
    return this.httpClient.post(dataTemp.url.getFireUsersLogin, { 'email': email });
  }

  createFireUser(userData: FireUserData) {
    return this.httpClient.post(dataTemp.url.createFireUser, userData);
  }

  updateFireUser(userData: FireUserData) {
    return this.httpClient.post(dataTemp.url.updateFireUser, userData);
  }

  checkIsMember(fire_user_id: string) {
    return this.httpClient.get(dataTemp.url.checkIsMember + fire_user_id);
  }
  //#endregion

  //#region midtrans
  public charge(chargeData: charge) {
    return this.httpClient.post(dataTemp.url.charge, chargeData);
  }

  public charge2(chargeData: charge) {
    return this.httpClient.post(dataTemp.url.charge2, chargeData);
  }

  public status(transaction_id: string, production: boolean) {
    return this.httpClient.get(dataTemp.url.status + transaction_id, { params: { 'production': production } });
  }
  //#endregion

  //#region transactions
  getTransactions() {
    return this.httpClient.get(dataTemp.url.getTransactions);
  }

  getTransactionbyId(transaction_id: string) {
    return this.httpClient.post(dataTemp.url.getTransactionbyId, { 'transaction_id': transaction_id });
  }

  createTransaction(transactionData: TransactionData) {
    return this.httpClient.post(dataTemp.url.createTransaction, transactionData);
  }

  updateTransaction(transactionData: TransactionData) {
    return this.httpClient.post(dataTemp.url.updateTransaction, transactionData);
  }
  //#endregion

  //#region subscriptions
  getSubscriptions() {
    return this.httpClient.get(dataTemp.url.getSubscriptions);
  }

  getSubscriptionbyId(subscription_id: string) {
    return this.httpClient.post(dataTemp.url.getSubscriptionbyId, { 'subscription_id': subscription_id });
  }

  createSubscription(subscriptionData: SubscriptionData) {
    return this.httpClient.post(dataTemp.url.createSubscription, subscriptionData);
  }

  updateSubscription(subscriptionData: SubscriptionData) {
    return this.httpClient.post(dataTemp.url.updateSubscription, subscriptionData);
  }
  //#endregion

  //////////////////////////////////

  async GetContents(): Promise<ContentData> {
    const res: any = await new Promise(resolve => {
      this.getContents().subscribe(data => {
        resolve(data);
      });
    });

    // if (resSeat.response == 'failed') throw (resSeat.data);
    return res.data;
  }

  public async GetContentsbyName(parent_name: string) {
    const res: any = await new Promise(resolve => {
      this.getContentsbyName(parent_name).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data content: ' + parent_name);
    return res.data;
  }

  public async GetContentbyData(data: string) {
    const res: any = await new Promise(resolve => {
      this.getContentbyData(data).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data content: ' + data);
    return res.data.find((x: any) => x);
  }

  public async SearchContentsbyData(data: string) {
    const res: any = await new Promise(resolve => {
      this.searchContentsbyData(data).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data content: ' + data);
    return res.data;
  }

  public async GetFireUserSummary() {
    const res: any = await new Promise(resolve => {
      this.getFireUserSummary().subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data user summary');
    return res.data.find((x: any) => x);
  }

  public async GetFireUsersLimit(limit: number, page: number, status?: string) {
    const res: any = await new Promise(resolve => {
      this.getFireUsersLimit(limit, page, status).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data user');
    return res.data;
  }

  public async SearchFireUsersLimit(data: string, limit: number, page: number, status?: string) {
    const res: any = await new Promise(resolve => {
      this.searchFireUsersLimit(data, limit, page, status).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data user');
    return res.data;
  }

  public async GetUserProfile() {
    const user = this.auth.currentUser;

    const res: any = await new Promise(resolve => {
      this.getFireUsersbyEmail(user?.email!).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data profile');
    return res.data.find((x: any) => x);
  }

  public async GetUserProfileForLogin(email: string) {
    const res: any = await new Promise(resolve => {
      this.getFireUsersLogin(email).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal login');
    return res.data.find((x: any) => x);
  }

  public async CheckIsMember(fire_user_id: string) {
    const res: any = await new Promise(resolve => {
      this.checkIsMember(fire_user_id).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') res.data.find((x: any) => x);
    // return res.data.find((x: any) => x); // revisi jika ada yang double, maka diambil data paling baru
    return res.data.find((x: any) => x);
  }

  public async GetSubscriptionbyId(subscription_id: string) {
    const res: any = await new Promise(resolve => {
      this.getSubscriptionbyId(subscription_id).subscribe(data => {
        resolve(data);
      });
    });

    if (res.status == 'failed') throw ('Gagal memuat data subscription: ' + subscription_id);
    return res.data.find((x: any) => x);
  }
}