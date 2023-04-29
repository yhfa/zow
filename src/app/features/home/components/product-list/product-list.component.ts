import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { combineLatest, map } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductItemComponent } from '../../components/product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ProductItemComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) {}

  products$ = this._productService.productsBySelectedCategory$;
  isLoading$ = this._productService.isProductsLoading$;
  categories$ = this._categoryService.categories$;

  vm$ = combineLatest([this.products$, this.isLoading$, this.categories$]).pipe(
    map(([products, isLoading, categories]) => ({
      products,
      isLoading,
      categories,
    }))
  );

  onSelected({ tab }: MatTabChangeEvent): void {
    this._productService.selectedCategoryChange(tab.textLabel);
  }
}
