import { Column } from './column.model';

/**
 * Defines a  column which is displayed in {@link HeaderColumns}
 */
export interface TitleColumn extends Column {
  // id of the column
  id?: string | number;
  // index of the column. will be set automatically if not seet
  index?: number;
  // title of the column
  columnTitle: string;
  // defines if the column is visible or not
  hide?: boolean;
}
