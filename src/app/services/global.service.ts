import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { NavigationExtras } from '@angular/router';
import { dataTemp } from '../dataTemp';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // PROFILE
  // public profile: any;
  profile: any = { email: undefined, nama: undefined, tglLahir: undefined, profesi: undefined, photo: undefined, status: undefined, isAdmin: false };

  // Master Data
  public userDataList: any = [];

  // Buttons
  public actionSheetButtons: any = [];
  public actionSheetAudioButtons: any = [];

  // Cache
  cache: any[] = [];

  constructor(private toastController: ToastController,
    private alertController: AlertController) {
    const types: any = dataTemp.type;
    for (var key in types) { this.actionSheetButtons.push({ text: types[key], data: { action: types[key] } }); }
    this.actionSheetButtons.push({ text: 'Cancel', role: 'cancel', data: { action: undefined } });

    const audios: any = dataTemp.audio;
    for (var key in audios) { this.actionSheetAudioButtons.push({ text: audios[key], data: { action: audios[key] } }); }
    this.actionSheetAudioButtons.push({ text: 'Cancel', role: 'cancel', data: { action: undefined } });
  }

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

  public async GetProfileFromPreference(): Promise<FireUserData> {
    this.profile = JSON.parse((await Preferences.get({ key: dataTemp.keyStrg.profile })).value!);
    return this.profile;
  }

  public async SaveProfileToPreference(profile: FireUserData) {
    profile.lampiran = ''; 
    profile.photo = dataTemp.master.photo;
    await Preferences.set({ key: dataTemp.keyStrg.profile, value: JSON.stringify(profile) });
  }

  public SetExtras(data: { data: any; title: string; defaultHref: string }): NavigationExtras {
    return {
      state: {
        data: data,
      }
    };
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

// export class UserData {
//   public fire_user_id?: string = '';
//   public email: string = '';
//   public nama: string = '';
//   public tglLahir: string = '';
//   public profesi: string = '';
//   public lampiran: string = '';
//   public photo?: string = '';
//   public isAdmin: boolean = false;

//   constructor() { }
// }

export class FireUserData {
  public fire_user_id?: string = '';
  public email: string = '';
  public nama: string = '';
  public tglLahir: string = '';
  public profesi: string = '';
  public lampiran: string = '';
  public photo?: string = '';
  public status: string = '';
  public isAdmin: boolean = false;
  public isSuperAdmin: boolean = false;

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

export class ContentData {
  public content_id?: number = 0;
  public parent_name: string = '';
  public urut: number = 0;
  public type: string = '';
  public data: string = '';
  public title?: string = '';
  public title_alias?: string = '';
  public image?: string = '';

  constructor() { }
}

export class TriaseData {
  public title: string = '';
  public data: string = '';
  // public logDetail: string = '';
  // public dateTime: string = '';

  constructor() { }
}
