import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productsUrl = 'https://fakestoreapi.com/products';

  constructor(private _http: HttpClient) {}

  products$ = this._http.get<Product[]>(this._productsUrl);

  private _isProductsLoading = new BehaviorSubject(false);
  isProductsLoading$ = this._isProductsLoading.asObservable();

  private _selectedCategorySubject = new BehaviorSubject<string | null>(null);
  selectedCategoryAction$ = this._selectedCategorySubject.asObservable();

  productsBySelectedCategory$ = this.selectedCategoryAction$.pipe(
    filter(selectedCategory => Boolean(selectedCategory)),
    switchMap(selectedCategory => {
      this._isProductsLoading.next(true);

      return this._http.get<Product[]>(
        `${this._productsUrl}/category/${selectedCategory}`
      );
    }),
    tap(() => {
      this._isProductsLoading.next(false);
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
