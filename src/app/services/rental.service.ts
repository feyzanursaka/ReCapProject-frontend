import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalsDetails(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"rentals/getrentaldetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  addRental(rental: Rental) {
    let newPath = this.apiUrl + 'rentals/add';
    this.httpClient.post(newPath, rental).subscribe();
  }

  isCarAvailable(carId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/iscaravailable?carId=' + carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
