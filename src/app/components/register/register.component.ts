import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormControl  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService, 
    private router: Router,
    private toastrService:ToastrService

  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
     
      email:["",Validators.required],
      password: ["",Validators.required],
      firstName:["",Validators.required],
      lastName: ["",Validators.required]
     
    })
  }
  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let loginModel = Object.assign({},this.registerForm.value)

      this.authService.register(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        console.log(response)
        console.log(response.data.token)
        localStorage.setItem("token",response.data.token)
        this.router.navigate(['/login']);
      },responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
  }
}
