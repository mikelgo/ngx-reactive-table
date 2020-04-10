import { RowDefinition } from './models/table-models';
import { Observable } from 'rxjs';

/**
 * Defines common behavior a table has
 */
export interface TableBehavior {
  // probably a selectable: Selectable?
  onRowSelect(row: RowDefinition, rowIndex: number): void;
  getSelectedRows(): Observable<RowDefinition[]>;
}
