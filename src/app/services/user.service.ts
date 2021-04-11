import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "users/update" ,user);
  }

  getByUserId(id:number):Observable<ListResponseModel<User>>{
    let newPath = environment.apiUrl + "users/getbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getUserByMail(email: string) {
    let newPath = environment.apiUrl + "users/getbyemail?email=" + email;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = environment.apiUrl +'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

 /* 
  getUserFindexByUserId(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = environment.apiUrl + "users/getbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

updateUserFindex(userId:number):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "users/updateuserfindex?userId=" + userId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
*/
}