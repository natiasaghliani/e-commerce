import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [HttpService],
})
export class CardComponent {
  @Input() thumbnail!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() discountPercentage!: string;
  @Input() rating!: string;
  @Input() price!: number;
  @Input() productId!: number;
  @Input() quantity!: number;

  get authenticated(): boolean {
    return JSON.parse(localStorage.getItem('authenticated') || 'false');
  }

  constructor(private router: Router, private basketService: BasketService) {}

  buy(): void {
    if (this.authenticated) {
      this.router.navigate(['/checkout'], {queryParams: {productId: this.productId, quantity: this.quantity}});
    } else {
      sessionStorage.setItem('tempProductId', JSON.stringify(this.productId));
      this.router.navigate(['/login']);
    }
  }
}
