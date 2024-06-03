import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CardComponent } from '../../components/card/card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CardComponent, MatPaginatorModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  providers: [HttpService],
})
export class SearchResultComponent {
  resultProducts: any = [];
  public skip = 0;
  public limit = 8;
  public total = 0;
  loader = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      const keyword = params.search;
      if (keyword) {
        this.loader = true;
        this.httpService
          .getSearchResult(keyword, params.skip || 0)
          .pipe(finalize(() => (this.loader = false)))
          .subscribe((response: any) => {
            this.total = response.total;

            this.resultProducts = response.products;
            console.log(response);
          });
      }
    });
  }

  pageChange(event: PageEvent) {
    console.log(event);
    this.skip = event.pageIndex;
    this.router.navigate([], {
      queryParams: { skip: this.skip },
      queryParamsHandling: 'merge',
    });
  }
}
