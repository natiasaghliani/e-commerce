import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [SliderComponent, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [HttpService],
})
export class DetailComponent {
  public productData: any = null;

   

  constructor(private router: Router, private httpService: HttpService,private activatedRoute: ActivatedRoute, private basketService: BasketService){
    this.fetchProductData()
  }


  fetchProductData(){
    this.httpService.getProductById(this.activatedRoute.snapshot.paramMap.get('id')!).subscribe(response => {
      this.productData = response
    })
  }

  addToBasket(product: any): void {
    this.basketService.addToBasket(this.productData);

    
  }

  buyNow(): void {
    this.router.navigate(['checkout'], {queryParams: {productId: this.productData.id, quantity: this.productData.quantity}});
  }

  removeItem(product: any): void {
    this.basketService.removeItem(product);
  }

  get productQuantity() {
    return this.basketService.basketProducts.find(product => product.id === this.productData.id)?.quantity
  }

  get productReviews(): any[] {
    return this.productData?.reviews || [];
  }

}
