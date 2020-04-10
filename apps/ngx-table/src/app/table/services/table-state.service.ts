import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RowDefinition } from '../models/table-models';
import { map, startWith, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableStateService {
  private selectedRows: RowDefinition[] = [];
  private selectedRowsCache$$ = new BehaviorSubject<RowDefinition[]>(null);
  public selectedRows$ = this.selectedRowsCache$$.asObservable();
  public selectedRowsCount$: Observable<number> = this.selectedRows$.pipe(
    filter(values => values !== null),
    map(values => values.length)
  );

  private lastSelectedRowCache$$ = new BehaviorSubject<RowDefinition>(null);
  public lastSelectedRow$ = this.lastSelectedRowCache$$.asObservable();

  public onRowSelect(row: RowDefinition, rowIndex: number): void {
    if (!this.selectedRows.includes(row)) {
      this.selectedRows.push(row);
      this.selectedRowsCache$$.next(this.selectedRows);
    } else {
      const index = this.selectedRows.indexOf(row);
      this.selectedRows.splice(index, 1);
      this.selectedRowsCache$$.next(this.selectedRows);
    }

    this.lastSelectedRowCache$$.next(row);
  }
  constructor() {}
}
/**
 * TODO:
 * Cache for data which comes from datasource
 * provides data
 * updates data
 *
 * provides cache for selected rows
 *
 * Initializes columns/row indices?
 */
