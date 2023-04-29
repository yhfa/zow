import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { TranslateModule } from '@ngx-translate/core';

import { ProductService } from '../../services/product.service';
import { Product } from './../../models/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-save-product',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './save-product-dialog.component.html',
  styleUrls: ['./save-product-dialog.component.scss'],
})
export class SaveProductDialogComponent {
  saveProductForm = this._fb.group({
    title: [this.data.product?.title, Validators.required],
    description: [this.data.product?.description, Validators.required],
    price: [this.data.product?.price, Validators.required],
    category: [this.data.product?.category, Validators.required],
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      product?: Product;
    },
    private _dialogRef: MatDialogRef<SaveProductDialogComponent>,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _fb: FormBuilder
  ) {}

  categories$ = this._categoryService.categories$;

  async onSubmit() {
    this.closeDialog(this.saveProductForm.value as Product);
  }

  closeDialog(data?: Product) {
    this._dialogRef.close(data);
  }
}
