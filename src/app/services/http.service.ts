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

  setAllProduct(): void {
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

  getProductById(id: string): Observable<any> {
    const url = 'https://dummyjson.com/products/' + id;
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    const url = 'https://dummyjson.com/products/category-list';
    return this.http.get(url);
  }

  getProductByCategory(category: string = '', limit: string | number, skip: string | number): Observable<any> {
    let url = null;
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }
    return this.http.get(url);
  }

  getPagination(): Observable<any> {
    const url = 'https://dummyjson.com/products?limit=10&skip=10&select=title,price';
    return this.http.get(url);
  }

  getSearchResult(keyword: string, skip: string | number): Observable<any> {
    const url = `https://dummyjson.com/products/search?q=${keyword}&skip=${skip}&limit=8`;
    return this.http.get(url);
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `https://dummyjson.com/auth/login`;
    return this.http.post(url, {username, password})
  }

}
