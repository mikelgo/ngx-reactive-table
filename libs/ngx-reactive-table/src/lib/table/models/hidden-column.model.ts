import { TitleColumn } from './title-column.model';
import { DataColumn } from './data-column.model';

export interface HiddenColumns {
  titleColumns: TitleColumn[];
  dataColumns: DataColumn[];
  count: number;
}
