// import { RowDefinition } from './models/table-models';
import { Observable } from 'rxjs';
import { DataRow } from './models/data-row.model';

/**
 * Defines common behavior a table has
 */
export interface TableBehavior {
  // probably a selectable: Selectable?
  onRowSelect(row: DataRow, rowIndex: number): void;
  getSelectedRows(): Observable<DataRow[]>;
  getSelectedRowsCount(): Observable<number>;
}
