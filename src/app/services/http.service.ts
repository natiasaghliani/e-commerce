import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from './basket.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  productsData!: any[];

  constructor(private http: HttpClient, private basketService: BasketService) {}

  setAllProduct() {
    this.getAllProduct().subscribe((response: any) => {
      this.productsData = response.products;
      this.basketService.basketProducts.forEach((product) => {
        const exsistingProduct = this.productsData.find(
          (iProduct) => iProduct.id === product.id
        );
        if (exsistingProduct) {
          exsistingProduct.quantity = product.quantity;
        }
      });
      console.log(this.productsData);
    });
  }

  getAllProduct(): Observable<any> {
    const url = 'https://dummyjson.com/products';

    return this.http.get(url);
  }

  getProductById(id: string) {
    const url = 'https://dummyjson.com/products/' + id;
    return this.http.get(url);
  }

  getCategories() {
    const url = 'https://dummyjson.com/products/category-list';
    return this.http.get(url);
  }

  getProductByCategory(category: string = '') {
    let url = null;
    if (category) {
      url = 'https://dummyjson.com/products/category/' + category;
    } else {
      url = 'https://dummyjson.com/products';
    }
    return this.http.get(url);
  }

  ngOnInit() {}
}
