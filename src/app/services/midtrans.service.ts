import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dataTemp } from '../dataTemp';
import { InjectorInstance } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class MidtransService {
  httpClient = InjectorInstance.get<HttpClient>(HttpClient);

  constructor() { }

  public snapTransactions(chargeData: charge) {
    return this.httpClient.post(dataTemp.urlMidtrans.snapTransactions, chargeData,
      {
        headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Basic U0ItTWlkLXNlcnZlci1BVnppdXRudE9TbF9LU3BBMHJrbk5fZlg6',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
  }

  public charge(chargeData: charge) {
    return this.httpClient.post(dataTemp.urlMidtrans.charge, chargeData,
      {
        headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Basic U0ItTWlkLXNlcnZlci1BVnppdXRudE9TbF9LU3BBMHJrbk5fZlg6',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
  }
}

// export interface charge {
//   payment_type: string,
//   transaction_details: transaction_details,
//   credit_card: credit_card,
//   item_details?: item_details[],
//   customer_details?: customer_details,
// }
export interface charge {
  payment_type: string,
  transaction_details: transaction_details,
  credit_card?: credit_card,
  item_details?: item_details[],
  customer_details?: customer_details,
  gopay?: gopay,
  metadata?: metadata,
  production: boolean
}
export interface metadata {
  fire_user_id: string,
  paket: string,
}
export interface gopay {
  enable_callback: boolean,
  callback_url: string,
}
export interface transaction_details {
  order_id: string,
  gross_amount: number,
}
export interface credit_card {
  secure: boolean,
}
export interface item_details {
  id: string,
  price: number,
  quantity: number,
  name: string,
}
export interface customer_details {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  billing_address?: billing_address,
  shipping_address?: shipping_address
}
export interface billing_address {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  postal_code: string,
  country_code: string,
}
export interface shipping_address {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  postal_code: string,
  country_code: string,
}
