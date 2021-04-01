import { Component, OnInit } from '@angular/core';

import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  brands: Brand[] = [];
  currentBrand:Brand={id:0,brandName:""};
  dataLoadedBrand = false;
  filterTextBrand="";

  colors: Color[] = [];
  currentColor:Color={id:0,colorName:""};
  dataLoadedColor=false;
  filterTextColor="";
  
  constructor(
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoadedBrand = true;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand=brand;
  }
  getCurrentBrandClass(brand: Brand){
    if (brand == this.currentBrand) {
      return 'list-group-item list-group-item-dark';
    } else {
      return 'list-group-item';
    }
  }
  getAllBrandClass(){
    if(!this.currentBrand){
     return "list-group-item active"
    }
    else{
     return "list-group-item"
    }
}
getSelectedBrand(brand:Brand){
  if (this.currentBrand.id == brand.id) {
    return true;
  } else {
    return false;
  }
}
//-----------------------color-----------------------------
getColors() {
  this.colorService.getColors().subscribe(response=>{
    this.colors=response.data
    this.dataLoadedColor=true;
  })
}
setCurrentColor(color: Color) {
  this.currentColor=color;
}
getCurrentColorClass(color: Color){
  if (color == this.currentColor) {
    return 'list-group-item list-group-item-dark';
  } else {
    return 'list-group-item';
  }
}
getAllColorClass(){
  if(!this.currentColor){
   return "list-group-item active"
  }
  else{
   return "list-group-item"
  }
}


getSelectedColor(color:Color){
  if (this.currentColor.id == color.id) {
    return true;
  } else {
    return false;
  }
}
}
