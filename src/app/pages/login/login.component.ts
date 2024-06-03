import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { HttpSentEvent } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [HttpService]

})
export class LoginComponent implements OnDestroy {
  username: string = 'emilys';
  password: string = 'emilyspass';
  errorMessage: string = '';
  

  constructor(private router: Router, private basketService: BasketService, private httpService: HttpService) {}

  login(): void {
    this.httpService.logIn(this.username, this.password).subscribe((response)=> {
      console.log(response)
    })

    if (this.username === 'emilys' && this.password === 'emilyspass') {
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
