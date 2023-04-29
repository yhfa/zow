import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Direction } from '@angular/cdk/bidi';

import { BehaviorSubject, Subscription, firstValueFrom } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { SaveProductDialogComponent } from '../save-product/save-product-dialog.component';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { columns } from './columns';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements AfterViewInit, OnDestroy {
  dataSource!: MatTableDataSource<Product>;
  private _productSub!: Subscription;
  @ViewChild(MatTable) table!: MatTable<Product>;
  @ViewChild(MatPaginator) private _paginator!: MatPaginator;

  private _isProductsLoading = new BehaviorSubject(false);
  isLoading$ = this._isProductsLoading.asObservable();

  constructor(
    private _productService: ProductService,
    private _matDialog: MatDialog,
    private _localeService: LocaleService,
    private _translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this._isProductsLoading.next(true);
    this._productSub = this._productService.products$.subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this._paginator;
      this._isProductsLoading.next(false);
    });
  }

  ngOnDestroy(): void {
    this._productSub.unsubscribe();
  }

  columns = columns;
  displayedColumns = [...this.columns.map(c => c.columnDef), 'edit'];

  async addProduct() {
    this._matDialog
      .open(SaveProductDialogComponent, {
        panelClass: ['dialog'],
        autoFocus: false,
        maxWidth: '118.7rem',
        height: '60rem',
        width: '61%',
        minWidth: '320px',
        direction: this._localeService.direction as Direction,
        data: {
          title: this._translateService.instant('product-table.add-product'),
        },
      })
      .afterClosed()
      .subscribe(async savedProduct => {
        if (!savedProduct) return;
        this._isProductsLoading.next(true);

        const newProduct = await firstValueFrom(
          this._productService.addNewProduct(savedProduct)
        );
        this._isProductsLoading.next(false);

        this.dataSource = new MatTableDataSource([
          ...this.dataSource.data.slice(0, this._paginator.pageSize),
          newProduct,
        ]);
        this.table.renderRows();
      });
  }

  async updateProduct(product: Product) {
    this._matDialog
      .open(SaveProductDialogComponent, {
        panelClass: ['dialog'],
        autoFocus: false,
        maxWidth: '118.7rem',
        height: '60rem',
        width: '61%',
        minWidth: '320px',
        direction: this._localeService.direction as Direction,
        data: {
          title: this._translateService.instant('product-table.update-product'),
          product,
        },
      })
      .afterClosed()
      .subscribe(async savedProduct => {
        if (!savedProduct) return;
        this._isProductsLoading.next(true);

        const updatedProduct = await firstValueFrom(
          this._productService.updateProduct(product.id as number, savedProduct)
        );
        this._isProductsLoading.next(false);

        const index = this.dataSource.data.findIndex(
          product => product.id === updatedProduct.id
        );

        this.dataSource.data[index] = updatedProduct;

        this.dataSource = new MatTableDataSource(
          this.dataSource.data.slice(0, this._paginator.pageSize)
        );
        this.table.renderRows();
      });
  }

  async deleteProduct(id: number) {
    this._isProductsLoading.next(true);

    const deletedProduct = await firstValueFrom(
      this._productService.deleteProduct(id)
    );
    this._isProductsLoading.next(false);

    this.dataSource = new MatTableDataSource(
      this.dataSource.data
        .filter(product => product.id !== deletedProduct.id)
        .slice(0, this._paginator.pageSize)
    );
    this.table.renderRows();
  }
}
