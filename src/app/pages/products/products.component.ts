import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CardComponent } from '../../components/card/card.component';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [HttpService]
})
export class ProductsComponent {
  public categories: any = [];
  public productByCategory: any = [];
  public selectedCategory = '';
  

  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute,) {
    this.fetchCategories();

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.category) {
        this.selectedCategory = params.category;
        this.fetchProductByCategory();
      }
    })
  }

  fetchCategories(): void {
    this.httpService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      });
  }

  fetchProductByCategory(): void {
    this.httpService.getProductByCategory(this.selectedCategory).subscribe(
      (response: any) => {
        this.productByCategory = response.products;
        console.log(response)
      });
  }

  showCategoryProducts(category: string) {
    this.router.navigate([], {queryParams: {category}});
  }



}
