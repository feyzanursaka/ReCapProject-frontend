import { RentalDetail } from './rentalDetail';
import { RentalResponseModel } from './rentalResponseModel';
import { ResponseModel } from "./responseModel";

export interface RentalDetailResponseModel extends ResponseModel{
  data: RentalDetail[];
}
