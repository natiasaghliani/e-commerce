import { Component } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '../../components/card/card.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bsket',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent, RouterModule],
  templateUrl: './bsket.component.html',
  styleUrl: './bsket.component.scss'
})
export class BsketComponent {

  get basketProducts(): any[] {
    return this.basketService.basketProducts;
  }

  constructor(private basketService: BasketService, private router: Router) {
    console.log(123, this.basketService.basketProducts)
  }

  addToBasket(product: any): void {
    this.basketService.addToBasket(product);

    
  }

  removeItem(product: any): void {
    this.basketService.removeItem(product);
  }

  total(product: any) {
    return this.basketService.total(product);
  }

  subTotal() {
    return this.basketService.subTotal()
  }

  taxes() {
    return this.basketService.taxes()
  }

  shipping() {
    return this.basketService.shipping()
  }

  totalPrice() {
    return this.basketService.totalPrice()
  }

  // goToHome() {
  //   this.router.navigate(['']);
  // }
}
