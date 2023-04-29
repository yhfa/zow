import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductTableComponent } from '../components/product-table/product-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAdmin = false;

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
