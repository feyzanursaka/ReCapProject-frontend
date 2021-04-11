import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Customer } from 'src/app/models/customer';
import { Byte } from '@angular/compiler/src/util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  customera:Customer[]=[];

  userUpdateForm: FormGroup;
  findeks:number;
  firstName:string;
  lastName:string;
  email:string;
  passwordSalt:Byte[];
  passwordHash:Byte[];

  reloaded = false;

  currentUserId:number;
  currentCustomerId:number;

  user:User;
  customer:Customer;

  constructor(
    private FormBuilder: FormBuilder,
    private userService: UserService,
    private customerService: CustomerService,
    private findeksService: FindeksService,
    private authService:AuthService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private localStorageService:LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createProfileForm();
    this.currentUserId = this.authService.getUserId();
    this.getUserDetail();
    this.getCustomerByUserId();
  }
  createProfileForm() {
    this.userUpdateForm = this.FormBuilder.group({
      id: [this.currentUserId, Validators.required],
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, Validators.required],
      passwordHash: [this.passwordHash, Validators.required],
      passwordSalt: [this.passwordSalt, Validators.required],
      status: [true, Validators.required],
    });
  }
  getUserDetail(){
    this.userService.getByUserId(this.currentUserId).subscribe(response => {
      this.currentUserId=response.data[0].id;
      this.user = response.data[0];
      this.firstName=response.data[0].firstName;
      this.lastName=response.data[0].lastName;
      this.email=response.data[0].email;
      this.passwordHash=response.data[0].passwordHash;
      this.passwordSalt=response.data[0].passwordSalt;
      this.updateCreateForm(this.user); 
    });
  }
  getUserById(){
    this.userService.getByUserId(this.currentUserId).subscribe(response => {
      this.user = response.data[0];
      console.log("First Name = "+response.data[0].firstName);
    });
  }

  getCustomerByUserId(){
    this.customerService.getByCustomerByUserId(this.currentUserId).subscribe(response => {
      this.customer = response.data[0];
      this.getByCustomerId(this.customer.id);
      console.log("Customer Id = "+this.customer.id);  
    });
  }
 
  getByCustomerId(customerId:number){
    this.findeksService.getByCustomerId(customerId).subscribe(response => {
      this.findeks = response.data.score;
      console.log("findeks = "+response.data.score);
    });
  }

  updateCreateForm(user:User) {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.currentUserId, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      passwordHash: [user.passwordHash, Validators.required],
      passwordSalt: [user.passwordSalt, Validators.required],
      status: [true, Validators.required]
    });
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let updateUserModal = Object.assign({}, this.userUpdateForm.value);
      this.userService.update(updateUserModal).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Kullanıcı ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }
  reload() {
    if (this.reloaded) {
      setTimeout(function () {
        location.reload();
      });
      setTimeout(function () {
        location.reload();
      });
      setTimeout(function () {
        location.reload();
      });
      this.reloaded = true;
    }
  }

}






