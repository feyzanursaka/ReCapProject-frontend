import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormControl  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(

     private formBuilder:FormBuilder,
     private router: Router,
     private authService:AuthService, 
     private toastrService:ToastrService
     
     ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
        this.router.navigate(['/car-list']);
      },responseError=>{
        //console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
  }

}