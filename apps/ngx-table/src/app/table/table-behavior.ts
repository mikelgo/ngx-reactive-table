import { RowDefinition } from './models/table-models';
import { Selectable } from './components/row/selectable';

/**
 * Defines common behavior a table has
 */
export interface TableBehavior {
  // probably a selectable: Selectable?
  selectRow(row: Selectable<RowDefinition>): void;
  getSelectedRows(): RowDefinition[];
}
