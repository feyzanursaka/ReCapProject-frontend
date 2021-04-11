import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  currentCustomer: string = 'currentCustomer';

  constructor() { 
    this.localStorage = window.localStorage;
  }

  get(value:string):string{
    var result = this.localStorage.getItem(value);
    if (result) {
      return result
    }else{
      return "";
    }
  }


  set(key: string, value: string){
    this.localStorage.setItem(key,value);
  }

  remove(key: string){
    this.localStorage.removeItem(key);
  }

  clean(){
    this.localStorage.clear();
  }
}