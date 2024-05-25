import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  email: string = 'admin';
  password: string = 'admin';
  errorMessage: string = '';
  

  constructor(private router: Router, private basketService: BasketService) {}

  login(): void {

    if (this.email === 'admin' && this.password === 'admin') {
      if(sessionStorage.getItem('tempProduct')) {
        this.basketService.addToBasket(JSON.parse(sessionStorage.getItem('tempProduct')!))
      }
      localStorage.setItem('authenticated', 'true')
      const productId = sessionStorage.getItem('tempProductId');
      if(productId) {
        this.router.navigate(['/checkout'], {queryParams: {productId}})
        return
      }
      this.router.navigate(['']);

    } else {
      localStorage.setItem('authenticated', 'false')
      this.errorMessage = 'Invalid password or user';
    }
  }

  ngOnDestroy(): void {
    sessionStorage.clear()
  }

}
