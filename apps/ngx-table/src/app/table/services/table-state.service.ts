import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  RowDefinition,
  HeaderColumns,
  ColumnDefinition
} from '../models/table-models';
import { map, startWith, filter } from 'rxjs/operators';
import { Datasource } from '../../datasource/datasource';

@Injectable({
  providedIn: 'root'
})
export class TableStateService<T> {
  // TODO hier gehts weiter
  private headerDefinition = new BehaviorSubject<HeaderColumns>(null);
  private dataColumnDefinition = new BehaviorSubject<ColumnDefinition>(null);
  private datasource = new BehaviorSubject<Datasource<T>>(null);

  private selectedRows: RowDefinition[] = [];
  private selectedRowsCache$$ = new BehaviorSubject<RowDefinition[]>(null);
  public selectedRows$ = this.selectedRowsCache$$.asObservable();
  public selectedRowsCount$: Observable<number> = this.selectedRows$.pipe(
    filter(values => values !== null),
    map(values => values.length)
  );

  private lastSelectedRowCache$$ = new BehaviorSubject<RowDefinition>(null);
  public lastSelectedRow$ = this.lastSelectedRowCache$$.asObservable();

  constructor() {}

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

  public setHeaderDefinition(headerDefinition: HeaderColumns): void {
    this.headerDefinition.next(headerDefinition);
  }

  public getHeaderDefinition(): HeaderColumns {
    return this.headerDefinition.getValue();
  }

  public setDataColumnDefinition(dataColumnDefinition: ColumnDefinition): void {
    this.dataColumnDefinition.next(dataColumnDefinition);
  }

  public getDataColumnDefinition(): ColumnDefinition {
    return this.dataColumnDefinition.getValue();
  }

  public setDatasource(datasource: Datasource<T>): void {
    this.datasource.next(datasource);
  }

  public getDatasource(): Datasource<T> {
    return this.datasource.getValue();
  }

  // TODO implement
  private mapColumnDefinitionToRowDefinition(
    columnDefinition: ColumnDefinition,
    datasource: Datasource<T>
  ): RowDefinition[] {
    return null;
  }
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
