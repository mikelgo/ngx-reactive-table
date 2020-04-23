import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, defer } from 'rxjs';
import {
  RowDefinition,
  HeaderColumns,
  ColumnDefinition,
  DataRow,
  Cell
} from '../models/table-models';
import { map, startWith, filter, skip, tap } from 'rxjs/operators';
import { Datasource } from '../../datasource/datasource';

@Injectable({
  providedIn: 'root'
})
export class TableStateService<T> {
  private headerDefinition = new BehaviorSubject<HeaderColumns>(null);
  private dataColumnDefinition = new BehaviorSubject<ColumnDefinition>(null);
  private datasource = new BehaviorSubject<Datasource<T>>(null);

  private headerDefinition$: Observable<
    HeaderColumns
  > = this.headerDefinition.asObservable();

  private dataColumnDefinition$: Observable<
    ColumnDefinition
  > = this.dataColumnDefinition.asObservable().pipe(filter(v => v !== null));

  private datasource$: Observable<
    Datasource<T>
  > = this.datasource.asObservable().pipe(filter(v => v !== null));

  private selectedRows: RowDefinition[] = [];
  private selectedRowsCache$$ = new BehaviorSubject<RowDefinition[]>(null);
  public selectedRows$ = this.selectedRowsCache$$.asObservable();
  public selectedRowsCount$: Observable<number> = this.selectedRows$.pipe(
    filter(values => values !== null),
    map(values => values.length)
  );

  private lastSelectedRowCache$$ = new BehaviorSubject<RowDefinition>(null);
  public lastSelectedRow$ = this.lastSelectedRowCache$$.asObservable();

  public rows$: Observable<DataRow[]> = combineLatest([
    this.dataColumnDefinition$,
    this.datasource$
  ]).pipe(
    map(([columnDefinition, datasource]) =>
      this.mapColumnDefinitionToRowDefinition(columnDefinition, datasource)
    )
  );

  constructor() {
    this.rows$.subscribe(console.log);
  }

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

  private mapColumnDefinitionToRowDefinition(
    columnDefinition: ColumnDefinition,
    datasource: Datasource<T>
  ): DataRow[] {
    const rows: DataRow[] = [];
    if (columnDefinition && datasource) {
      console.log('INCOMING ARGS: %o %o', columnDefinition, datasource);
      console.log('VALID ARGS');
      const valueKeys: string[] = columnDefinition.columns.map(
        c => c.displayProperty
      );
      datasource.getData().forEach((row, index) => {
        rows.push({
          index: index,
          values: this.getRowValues(row, columnDefinition)
        });
      });
    }

    return rows;
  }

  private getRowValues(row: T, columnDefinition: ColumnDefinition): Cell[] {
    const values: Cell[] = [];

    columnDefinition.columns.forEach(column => {
      values.push({
        val: row[column.displayProperty],
        cellRenderer: column.cellRenderer ? column.cellRenderer : null,
        template: column.template ? column.template : null,
        cssClass: column.class ? column.class : null
      });
    });
    return values;
  }
}
