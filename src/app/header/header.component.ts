import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  get authenticated(): boolean {
    return JSON.parse(localStorage.getItem('authenticated') || 'false')
    
  }

  constructor( 
    private basketService: BasketService, 
    private router: Router,

    ){}

    get basketProductAmount(): number{
      return this.basketService.basketProducts.reduce((totalQuantity: number, currentItem: any) => {
        return totalQuantity + currentItem.quantity;
    }, 0);
    } 

    logOut() {
      localStorage.clear()
      this.basketService.clearCart()
      this.router.navigate(['/login']);
    }

}
