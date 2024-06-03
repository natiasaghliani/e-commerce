import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CardComponent } from '../../components/card/card.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { skip } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { BasketService } from '../../services/basket.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, MatPaginatorModule, HomeComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [HttpService],
})
export class ProductsComponent {
  public categories: any = [];
  public productByCategory: any = [];
  public selectedCategory = '';
  public skip = 0;
  public limit = 8;
  public total = 0;
  showMobileCategories = false;

  get authenticated(): boolean {
    return JSON.parse(localStorage.getItem('authenticated') || 'false')
  }

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private cdr: ChangeDetectorRef,

  ) {
    this.fetchCategories();

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.selectedCategory = params.category || null;

      this.skip = params.skip || 0;
      this.fetchProductByCategory();
    });
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
  

  fetchCategories(): void {
    this.httpService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  fetchProductByCategory(): void {
    this.httpService
      .getProductByCategory(this.selectedCategory, this.limit, this.skip)
      .subscribe((response: any) => {
        this.productByCategory = response.products;
        this.total = response.total;
        // this.skip = response.skip;
        // this.limit = response.limit;
        console.log(response);
      });
  }

  toggleCategories() {
    this.showMobileCategories = !this.showMobileCategories;
  }

  showCategoryProducts(category: string | null = null) {
    this.skip = 0;
    this.router.navigate([], { queryParams: { category } });
  }

  pageChange(event: PageEvent) {
    console.log(event);
    this.skip = event.pageIndex;
    this.router.navigate([], {
      queryParams: { skip: this.skip },
      queryParamsHandling: 'merge',
    });

    // this.fetchProductByCategory();
  }
}
