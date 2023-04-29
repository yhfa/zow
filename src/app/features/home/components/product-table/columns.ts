import { Product } from '../../models/product';
import { ColumnType, ProductColumn } from '../../models/productTable';

export const columns: ProductColumn[] = [
  {
    columnDef: 'id',
    header: 'id',
    type: ColumnType.text,
    cell: (element: Product) => `${element.id}`,
  },
  {
    columnDef: 'title',
    header: 'title',
    type: ColumnType.text,
    cell: (element: Product) => `${element.title}`,
  },
  {
    columnDef: 'image',
    header: 'image',
    type: ColumnType.image,
    cell: (element: Product) => `${element.image}`,
  },
  {
    columnDef: 'price',
    header: 'price',
    type: ColumnType.text,
    cell: (element: Product) => `${element.price}`,
  },
  {
    columnDef: 'description',
    header: 'description',
    type: ColumnType.text,
    cell: (element: Product) => `${element.description}`,
  },
  {
    columnDef: 'category',
    header: 'category',
    type: ColumnType.text,
    cell: (element: Product) => `${element.category}`,
  },
  {
    columnDef: 'rating',
    header: 'rating',
    type: ColumnType.text,
    cell: (element: Product) => `${element.rating?.rate || '_'}`,
  },
  {
    columnDef: 'ratingCount',
    header: 'rating-count',
    type: ColumnType.text,
    cell: (element: Product) => `${element.rating?.count || '_'}`,
  },
];
