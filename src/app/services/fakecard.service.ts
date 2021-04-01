import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakecardService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  apiUrl = environment.apiUrl;

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecards/iscardexist";
    console.log(fakeCard);
    return this.httpClient.post<ResponseModel>(newPath,fakeCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "fakecards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  updateCard(fakeCard:FakeCard){
    let newPath = this.apiUrl + "fakecards/update";
    this.httpClient.put(newPath,fakeCard)
  }
}