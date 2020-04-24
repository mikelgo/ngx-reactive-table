import { Column } from './column.model';

/**
 * defines the columns which hold the data to display in a table
 */
export interface DataColumn extends Column {
  displayProperty: string;
  id?: string | number;
  hide?: boolean;
}
