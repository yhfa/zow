import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  forkJoin,
  map,
  switchMap,
  tap,
} from 'rxjs';

import { Product } from '../models/product';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productsUrl = 'https://fakestoreapi.com/products';

  constructor(private _http: HttpClient) {}

  private _isProductsLoading = new BehaviorSubject(false);
  isProductsLoading$ = this._isProductsLoading.asObservable();

  private _selectedCategorySubject = new BehaviorSubject<string | null>(null);
  selectedCategoryAction$ = this._selectedCategorySubject.asObservable();

  products$ = this.selectedCategoryAction$.pipe(
    filter(selectedCategory => Boolean(selectedCategory)),
    switchMap(selectedCategory => {
      this._isProductsLoading.next(true);

      return this._http.get<Product[]>(
        `${this._productsUrl}/category/${selectedCategory}`
      );
    }),
    tap(data => {
      this._isProductsLoading.next(false);
      console.log('Products: ', JSON.stringify(data));
    })
  );

  selectedCategoryChange(selectedCategory: string): void {
    this._selectedCategorySubject.next(selectedCategory);
  }

  addNewProduct(product: Product) {
    return this._http.post<Product>(this._productsUrl, product);
  }

  updateProduct(id: number, product: Product) {
    return this._http.patch<Product>(`${this._productsUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this._http.delete<Product>(`${this._productsUrl}/${id}`);
  }
}
