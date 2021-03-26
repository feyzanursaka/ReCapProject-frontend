import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44333/api/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalsDetails(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"rentals/getrentaldetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
}
