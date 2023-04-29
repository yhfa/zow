import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categoriesUrl = 'https://fakestoreapi.com/products/categories';

  constructor(
    private _http: HttpClient,
    private _productService: ProductService
  ) {}

  categories$ = this._http.get<string[]>(this._categoriesUrl).pipe(
    tap(categories =>
      this._productService.selectedCategoryChange(categories[0])
    ),
    tap(data => console.log('Categories: ', JSON.stringify(data)))
  );
}
