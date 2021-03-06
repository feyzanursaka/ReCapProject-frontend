import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { RegisterModel } from '../models/registerModel';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper:JwtHelperService = new JwtHelperService();
  userName:string;
  userId:number;
  roles:string[];

  constructor(private httpClient:HttpClient,
    private localStorageService:LocalStorageService
  ) {
      this.setUserId()
      this.setRoles();
    }

  

  isAuthenticated(){
    if (this.localStorageService.get("token")) {
      return true;      
    } else{
      return false;
    }
  }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl+"auth/login", loginModel)
  }

  //-----------------------

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl+"auth/register", registerModel)
  }

  setUserId(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
      this.userId = Number(decoded[propUserId]);
    }
  }

  getUserId():number{
    return this.userId;
  }

 

  setRoles(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var role = Object.keys(decoded).filter(x => x.endsWith("/role"))[0];
      this.roles = (decoded[role])
    }
  }

  isAdmin(){
    if (this.roles.includes("admin")) {
      return true
    }
    return false;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
  }

}