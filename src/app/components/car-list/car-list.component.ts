import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';

import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];

  dataLoaded = false;

  carAddForm: FormGroup;
  carUpdateForm: FormGroup;
  carDeleteForm: FormGroup;


  Id: number;
  colorId: number;
  brandId: number;

  selectedCar: Car;


  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,

    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {

    this.getCars();
    this.getBrands();
    this.getColors();

    this.addCreateForm();
    this.updateCreateForm();
    this.deleteCreateForm();
  }

  getCars() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = response.success;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = response.success;
    });
  }

  setSelectedCarToUpdate(car: Car) {
    this.selectedCar = car;
    this.updateCreateForm();
  }

  setSelectedCarToDelete(car: Car) {
    this.selectedCar = car;
    this.deleteCreateForm();
  }

  addCreateForm() {
    this.carAddForm = this.formBuilder.group({


      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]

    })
  }

  updateCreateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.selectedCar?.id, Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  

  deleteCreateForm() {
    this.carDeleteForm = this.formBuilder.group({
      id: [this.selectedCar?.id, Validators.required],
      brandId: [this.selectedCar?.brandId, Validators.required],
      colorId: [this.selectedCar?.colorId, Validators.required],
      modelYear: [this.selectedCar?.modelYear, Validators.required],
      dailyPrice: [this.selectedCar?.dailyPrice, Validators.required],
      description: [this.selectedCar?.description, Validators.required]
    });
  }

  addCar() {
   
      if(this.carAddForm.valid){
        let carModel = Object.assign({},this.carAddForm.value)
        this.carService.add(carModel).subscribe(response=>{
          this.toastrService.success(response.message,"Başarılı")
        },responseError=>{
          if(responseError.error.Errors.length>0){
            for (let i = 0; i <responseError.error.Errors.length; i++) {
              console.log(responseError.error.Errors[i])
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage
                ,"Doğrulama hatası")
            }       
          } 
        })
        
      }else{
        this.toastrService.error("Formunuz eksik","Dikkat")
      }
      
    }
  

  updateCar() {
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            console.log(responseError.error.Errors[i])
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      console.log(this.carUpdateForm);
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  deleteCar() {
    if(this.carDeleteForm.valid){
      let carModel = Object.assign({},this.carDeleteForm.value)
      this.carService.delete(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            console.log(responseError.error.Errors[i])
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      console.log(this.carDeleteForm);
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
 
}

