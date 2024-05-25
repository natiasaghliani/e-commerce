import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { BsketComponent } from '../bsket/bsket.component';
import { HttpService } from '../../services/http.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, BsketComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  providers: [HttpService]
})
export class CheckoutComponent {

  checkoutForm: FormGroup;
  public productData: any = null;
  productQuantity = 1;

  get basketProducts(): any[] {
    return this.basketService.basketProducts;
  }

  addToBasket(product: any): void {
    if(this.productData) {
      this.productQuantity += 1
    }else {

      this.basketService.addToBasket(product);   
    }
  }

  removeItem(product: any): void {
    if(this.productData) {
      if(this.productQuantity > 1){

        this.productQuantity -= 1
      }

    }else {

      this.basketService.removeItem(product);   
    }
  }

  total(product: any) {
    if(this.productData) {
      return this.productData.price * this.productQuantity

    }else {
    return this.basketService.total(product);
    }
  }

  totalPrice() {
    if(this.productData) {
      return this.productData.price * this.productQuantity

    }else {
    return this.basketService.totalPrice()

    }
  }


  constructor(private fb: FormBuilder, private basketService: BasketService, private activatedRoute: ActivatedRoute, private httpService: HttpService, private router: Router,) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expDate: ['', [Validators.required, this.expirationDateValidator()]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]] 
    });

    console.log(this.activatedRoute.snapshot.queryParamMap.get("productId"))

    if(this.activatedRoute.snapshot.queryParamMap.get("productId")) {
      this.fetchProductData(this.activatedRoute.snapshot.queryParamMap.get("productId")!)
      if(this.activatedRoute.snapshot.queryParamMap.get("quantity")) {

        this.productQuantity = +this.activatedRoute.snapshot.queryParamMap.get("quantity")!
      }
    }
  }

  fetchProductData(id:  string){
    this.httpService.getProductById(id).subscribe(response => {
      this.productData = response
    })}


  expirationDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null; 
      }

      const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!regex.test(value)) {
        return { invalidExpirationDate: true };
      }

      const [month, year] = value.split('/').map((val: string) => parseInt(val, 10));
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear() % 100; 

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return { expired: true };
      }

      return null;
    };
  }

  formatExpirationDate(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    input.value = value;
    this.checkoutForm.get('expDate')?.setValue(value, { emitEvent: false });
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      console.log('Order placed', this.checkoutForm.value);
      console.log('Basket Products:', this.basketProducts)
      this.checkoutForm.reset();
      if(this.productData) {
        this.basketService.removeItem(this.productData, true)
        this.productData = {};
      }else{

        this.basketService.clearCart();
      }
      alert('Order Placed');
      this.router.navigate([''])

    } else {
      alert('Form is invalid, try again.');
    }
  }

  
}