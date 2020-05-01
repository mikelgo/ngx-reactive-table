import { Cell } from './cell.model';

export interface DataRow {
  id?: string | number;
  index?: number;
  cssClass?: string;
  values: Cell[];
}
