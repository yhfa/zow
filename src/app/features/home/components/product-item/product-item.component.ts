import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StarRatingModule } from 'angular-star-rating';

import { Product } from '../../models/product';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { Language } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, StarRatingModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  Language = Language;

  constructor(public localeService: LocaleService) {}
}
