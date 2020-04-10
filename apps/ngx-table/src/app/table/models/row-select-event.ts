import { RowDefinition } from './table-models';

export interface RowSelectEvent {
  rowIndex: number;
  row: RowDefinition;
}
