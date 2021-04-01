import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  rental:Rental;
  totalPrice:number;

  constructor(private httpClient:HttpClient) { }
  
 

  getRental(){
    return this.rental;
  }
  
  getTotalPrice(){
    return this.totalPrice;
  }

  setRental(rental:Rental, totalPrice:number){
    this.rental=rental;
    this.totalPrice=totalPrice;
  }
}