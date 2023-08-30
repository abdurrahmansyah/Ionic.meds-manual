import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // PROFILE
  public karyawanData: UserData = new UserData();

  // Master Data
  public userDataList: any = [];

  constructor(private toastController: ToastController,
    private alertController: AlertController) { }

  public GetDate(param?: any): DateData {
    var dateData = new DateData();
    var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    if (param) var date = new Date(param);
    else var date = new Date();

    dateData.date = date;
    dateData.decYear = date.getFullYear();
    dateData.szMonth = months[date.getMonth()];
    dateData.decMonth = date.getMonth() + 1;
    dateData.decDate = date.getDate();
    dateData.szDay = days[date.getDay()];
    dateData.decMinute = date.getMinutes();
    dateData.szMinute = dateData.decMinute < 10 ? "0" + dateData.decMinute : dateData.decMinute.toString();
    dateData.decHour = date.getHours();
    dateData.szHour = dateData.decHour < 10 ? "0" + dateData.decHour : dateData.decHour.toString();
    dateData.decSec = date.getSeconds();
    dateData.szAMPM = dateData.decHour > 12 ? "PM" : "AM";
    dateData.todayFormatted = formatDate(date, 'YYYY-MM-dd', 'en-US');
    dateData.todayDateTimeFormatted = formatDate(date, 'YYYY-MM-dd HH:mm:ss', 'en-US');

    return dateData;
  }

  async PresentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "dark",
      mode: "ios"
    });
    toast.present();
  }

  PresentAlert(msg: string) {
    this.alertController.create({
      mode: 'ios',
      message: msg,
      buttons: ['OK']
    }).then(alert => {
      return alert.present();
    });
  }
}

export class DateData {
  public date: Date = new Date();
  public szDay: string = '';
  public decDate: number = 0;
  public szMonth: string = '';
  public decYear: number = 0;
  public decHour: number = 0;
  public szHour: string = '';
  public decMinute: number = 0;
  public szMinute: string = '';
  public szAMPM: string = '';
  public decSec: number = 0;
  public decMonth: number = 0;
  public todayFormatted: string = '';
  public todayDateTimeFormatted: string = '';

  constructor() { }
}

export class UserData {
  public id?: string = '';
  public email: string = '';
  public nama: string = '';
  public tglLahir: string = '';
  public profesi: string = '';
  public lampiran: string = '';
  public photo: string = '';
  public isAdmin: boolean = false;

  constructor() { }
}

export class SubscribeData {
  public email: string = '';
  public kategori: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public paymentDate: string = '';
  public payment: string = '';

  constructor() { }
}

export class LogData {
  public email: string = '';
  public log: string = '';
  public logDetail: string = '';
  public dateTime: string = '';

  constructor() { }
}

export class TriaseData {
  public title: string = '';
  public data: string = '';
  // public logDetail: string = '';
  // public dateTime: string = '';

  constructor() { }
}
