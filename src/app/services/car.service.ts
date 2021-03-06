import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl=environment.apiUrl ;
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails(): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcardetail"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcardetailsbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetailsByCarId(carId:number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcardetailsbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsBySelect(brandId:number, colorId:number):Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl + "cars/getbyselected?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  add(car:Car):Observable<ListResponseModel<Car>>{
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl+"cars/add",car);
  }

  update(car:Car):Observable<ListResponseModel<Car>>{
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl+"cars/update",car);
  }
  delete(car:Car):Observable<ListResponseModel<Car>>{
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl+"cars/delete",car);
  }
}
