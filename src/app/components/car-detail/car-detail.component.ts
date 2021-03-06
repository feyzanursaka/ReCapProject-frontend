import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  cars: Car;
  dataLoaded = false;
  imageBaseUrl=environment.baseUrl;
  
  constructor(private carService: CarService,
    private carImageService:CarImageService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailsByCarId(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      } 
    })
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response => {
      this.cars = response.data[0];
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getImageByCarId(carId).subscribe(response => {
      this.carImages = response.data;
      this.dataLoaded = true;
      console.log(response.data);
    })
  }

  getSliderClassName(index:number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
}