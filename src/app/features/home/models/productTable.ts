import { Product } from './product';

export interface ProductColumn {
  columnDef: string;
  header: string;
  type: ColumnType;
  cell: (element: Product) => any;
}

export enum ColumnType {
  text = 'text',
  image = 'image',
}
