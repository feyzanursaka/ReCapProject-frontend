import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails: Car[] = [];
  carImages: CarImage[]=[];
  currentImage : CarImage;
  dataLoaded=false;
  imageBasePath = environment.baseUrl;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    
    private activatedRoute:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
    
      }
    })
    
  }
  getCarDetailsByCarId(cardId:number) {
    this.carService.getCarDetailsByCarId(cardId).subscribe(response=>{
      this.carDetails = response.data
      this.dataLoaded = true;
    })   
  }
  getCarImagesByCarId(carId:number) {
    this.carImageService.getImageByCarId(carId).subscribe(response=>{
      this.carImages = response.data
      this.dataLoaded = true;
    })   
  }
  
  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }
  getButtonClass(carImage:CarImage){
    if(carImage==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }
}