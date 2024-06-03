import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BasketService } from '../../services/basket.service';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [HttpService]
})
export class HomeComponent implements OnInit {
  basketProducts: any;
  public categories: any = [];
  public productByCategory: any = [];
  public selectedCategory = '';
  public skip = 0;
  public limit = 4;
  public total = 0;
  public section: any = {
    beauty: {
      products: [],
      title: 'Beauty',
      slug: 'beauty',
      img: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bce23c124964309.610f693c40c4d.png',
    },
    furniture: {
      products: [],
      title: 'Furniture',
      slug: 'furniture',
      img: 'https://t4.ftcdn.net/jpg/05/08/17/01/360_F_508170187_4Oonk4IG8u9eyfwSUvTASkT8hl71vRX2.jpg',
    },
    groceries: {
      products: [],
      title: 'Groceries',
      slug: 'groceries',
      img: 'https://s3-us-west-2.amazonaws.com/issuewireassets/primg/106838/buy-fresh-fruits-and-vegetables-online-dubai.jpg',
    },
    'womens-bags': {
      products: [],
      title: 'Womens bags',
      slug: 'womens-bags',
      img: 'https://tangerinehandcraft.com/cdn/shop/collections/Leera_Bags_16inch_Collection_Image.png?v=1706783140',
    },
    laptops: {
      products: [],
      title: 'Laptops',
      slug: 'laptops',
      img: 'https://images.ctfassets.net/wowgx05xsdrr/N6lQjMROdVlurGguN2Z0i/715690fec11d60580a7dbebcefd62c13/article-header-descriptors-branding-2.png?fm=webp&w=3840&q=75',
    },
    'mens-watches': {
      products: [],
      title: 'Mens Watches',
      slug: 'mens-watches',
      img: 'https://www.geckota.com/cdn/shop/articles/Banner-Seiko-Movements-in-GE-watches_1600x.jpg?v=1698918867',
    },
    'mobile-accessories': {
      products: [],
      title: 'Mobile Accessories',
      slug: 'mobile-accessories',
      img: 'https://static.vecteezy.com/system/resources/previews/018/942/899/non_2x/accessories-repair-service-banner-template-repairing-electronics-illustration-vector.jpg',
    },
  }

  get sectionKeys() {
    return Object.keys(this.section)
  }

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

  fetchProductByBeauty(): void {
    this.httpService
      .getProductByCategory('beauty', this.limit, this.skip)
      .subscribe((response: any) => {
        this.section.beauty.products = response.products;
        this.total = response.total;
        console.log(response);
      });
  }

  fetchProductByFurniture(): void {
    this.httpService
      .getProductByCategory('furniture', this.limit, this.skip)
      .subscribe((response: any) => {
        this.section.furniture = response.products;
        this.total = response.total;
        console.log(response);
      });
  }
  showCategoryProducts(category: string | null = null) {
    this.skip = 0;
    this.router.navigate(['/products'], { queryParams: { category } });
  }

  ngOnInit() {
    this.sectionKeys.forEach(key => {
      this.httpService
      .getProductByCategory(key, this.limit, this.skip)
      .subscribe((response: any) => {
        this.section[key].products = response.products;
        // this.total = response.total;
        // console.log(response);
      });
    })
    // this.fetchProductByBeauty()
    // this.fetchProductByFurniture()
  }

}
