import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FakecardService } from 'src/app/services/fakecard.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  id:number;
  moneyInTheCard:number;
  rental: Rental;
  cars: Car;
  customer: Customer;
  getCustomerId: number;
  amountOfPayment: number = 0;
  nameOnTheCard: string;
  cardNumber: string;
  cardCvv: string;
  expirationDate: string;
  fakeCard: FakeCard;
  cardExist: Boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakecardService,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
      }
    });
  }

  getCustomerDetailById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data[0];
      console.log(response);
    });
  }

  getCarDetail() {

    this.carService
      .getCarDetailsByCarId(this.rental.carId)
      .subscribe((response) => {
        this.cars = response.data[0];
        this.paymentCalculator();
      });

  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {

      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.amountOfPayment = numberOfDays * this.cars.dailyPrice;
      
    }
  }

  async rentACar() {

    let fakeCard: FakeCard = {

      id:this.id,
      userId:this.authService.getUserId(),
      nameOnTheCard: this.nameOnTheCard,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cardCvv: this.cardCvv,

    };
   
    this.cardExist = await this.isCardExist(fakeCard);

    if (this.cardExist) {

        this.rentalService.addRental(this.rental);
        this.toastrService.success('Arabayı kiraladınız', 'Işlem başarılı');
      
    } else {

      this.askSaveCard(fakeCard);

    }
  }

  askSaveCard(fakeCard: FakeCard) {

    if (window.confirm('Kartınız kayıtlı değil kayıt edilsin mi ?')) {
        
      this.fakeCardService.add(fakeCard).subscribe((response) => {
      this.toastrService.success("Kaydedildi!");  
      },responseError => {
        this.toastrService.error(responseError.error.message);
      });

    }
  }

  async isCardExist(fakeCard: FakeCard) {
    return (await this.fakeCardService.isCardExist(fakeCard).toPromise()).success;
  }

}