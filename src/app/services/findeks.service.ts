import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Findeks } from '../models/findeks';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class FindeksService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getByCustomerId(customerId: number): Observable<SingleResponseModel<Findeks>> {
    let newPath=this.apiUrl+"findeks/getbycustomerid?customerId="+customerId
    return this.httpClient.get<SingleResponseModel<Findeks>>(newPath);
  
  }
}