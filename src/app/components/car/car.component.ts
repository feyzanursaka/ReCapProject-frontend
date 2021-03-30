import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  dataLoaded=false;
  filterText="";

  constructor(private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsBySelect(params["brandId"],params["colorId"])
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }else{
        this.getCarDetails();
      }
    })
    
  }
  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarDetails() {
    this.carService.getCarDetails().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }
  getCarsByColor(colordId:number) {
    this.carService.getCarsByColor(colordId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }
  getCarsBySelect(brandId:number, colorId:number){
    this.carService.getCarsBySelect(brandId,colorId).subscribe(response=>{
       this.cars=response.data
       this.dataLoaded=true;
      if(this.cars.length == 0){
         this.toastrService.info('Arama sonucunuza ait bir araç bulunmamaktadır.', 'Arama Sonucu');
      }
     })
   }

  goToCarDetail(carId:number){
    this.router.navigate(['./cardetail',carId])
  }

}
