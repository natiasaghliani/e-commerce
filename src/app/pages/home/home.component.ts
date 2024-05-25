import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BasketService } from '../../services/basket.service';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [HttpService]
})
export class HomeComponent {
  basketProducts: any;

  get products(): any[] {
    return this.httpService.productsData;
  }
  get authenticated(): boolean {
    return JSON.parse(localStorage.getItem('authenticated') || 'false')
    
  }

    constructor(private basketService: BasketService, 
    private router: Router,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
    ){
      this.httpService.setAllProduct()
    }

  addToBasket(product: any): void {
    if(this.authenticated){

      this.basketService.addToBasket(product);
      this.cdr.detectChanges()
    }
    else{
      sessionStorage.setItem('tempProduct', JSON.stringify(product))
      this.router.navigate(['/login']);
    }
  }

  removeItem(product: any): void {
    this.basketService.removeItem(product);
  }

}
