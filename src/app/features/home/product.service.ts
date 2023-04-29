import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'https://fakestoreapi.com/products';

  constructor(private _http: HttpClient) {}

  products$ = this._http
    .get<Product[]>(this.productsUrl)
    .pipe(tap(data => console.log('Products: ', JSON.stringify(data))));
}
