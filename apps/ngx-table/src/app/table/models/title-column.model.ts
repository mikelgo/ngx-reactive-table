import { Column } from './column.model';

/**
 * Defines a  column which is displayed in {@link HeaderColumns}
 */
export interface TitleColumn extends Column {
  // title of the column
  columnTitle: string;
}
