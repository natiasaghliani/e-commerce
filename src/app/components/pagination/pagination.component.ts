import {Component, Injectable} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  providers: [HttpService]

})
export class PaginationComponent {

  constructor(private httpService: HttpService,) {

  }

}

// import {Component, Injectable} from '@angular/core';
// import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
// import {Subject} from 'rxjs';

// @Injectable()
// export class MyCustomPaginatorIntl implements MatPaginatorIntl {
//   changes = new Subject<void>();

//   firstPageLabel = $localize`First page`;
//   itemsPerPageLabel = $localize`Items per page:`;
//   lastPageLabel = $localize`Last page`;

//   nextPageLabel = 'Next page';
//   previousPageLabel = 'Previous page';

//   getRangeLabel(page: number, pageSize: number, length: number): string {
//     if (length === 0) {
//       return $localize`Page 1 of 1`;
//     }
//     const amountPages = Math.ceil(length / pageSize);
//     return $localize`Page ${page + 1} of ${amountPages}`;
//   }
// }

// /**
//  * @title Paginator internationalization
//  */
// @Component({
//   selector: 'app-pagination',
//   templateUrl: './pagination.component.html',
//   standalone: true,
//   imports: [MatPaginatorModule],
//   providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
// })
// export class PaginationComponent {}
