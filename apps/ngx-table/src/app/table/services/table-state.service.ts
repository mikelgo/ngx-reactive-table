import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  defer,
  Subject
} from 'rxjs';
import {
  RowDefinition,
  DataRow,
  Cell,
  TitleColumn,
  DataColumn
} from '../models/table-models';
import {
  map,
  startWith,
  filter,
  skip,
  tap,
  takeUntil,
  concatAll,
  toArray
} from 'rxjs/operators';
import { Datasource } from '../../datasource/datasource';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class TableStateService<T> implements OnDestroy {
  private destroy$ = new Subject();
  private headerDefinition = new BehaviorSubject<TitleColumn[]>(null);
  private dataColumnDefinition = new BehaviorSubject<DataColumn[]>(null);
  private datasource = new BehaviorSubject<Datasource<T>>(null);

  private headerDefinition$: Observable<
    TitleColumn[]
  > = this.headerDefinition.asObservable();

  private dataColumnDefinition$: Observable<
    DataColumn[]
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
  // TODO when hide then do not publish
  // TODO when hide then also adapt row data
  // TODO onCOlumnHideChangeClick$$ = hier rein mergen und dann column definition anpassen
  public renderHeaderDefinitions$: Observable<
    TitleColumn[]
  > = this.headerDefinition
    .asObservable()
    .pipe(map(titleColumns => titleColumns.filter(c => !c.hide)));
  // public renderDataColumnDefinitions$: Observable<
  //   ColumnDefinition
  // > = this.dataColumnDefinition.asObservable();

  constructor() {
    this.rows$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.headerDefinition.complete();
    this.dataColumnDefinition.complete();
    this.datasource.complete();

    this.selectedRows = [];
    this.selectedRowsCache$$.complete();
    this.lastSelectedRowCache$$.complete();
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

  public setHeaderDefinition(headerDefinition: TitleColumn[]): void {
    const headers: TitleColumn[] = [...headerDefinition];
    headers.forEach((header, index) => {
      header.id = header.id ? header.id : this.getID();
      header.index = index;
      header.hide = header.hide ? header.hide : false;
    });

    // TODO check if incoming headerDefinition has ID - if all are unique otherwise throw error!
    this.headerDefinition.next(headers);
  }

  public getHeaderDefinition(): TitleColumn[] {
    return this.headerDefinition.getValue();
  }

  public setDataColumnDefinition(dataColumnDefinition: DataColumn[]): void {
    this.dataColumnDefinition.next(dataColumnDefinition);
  }

  public getDataColumnDefinition(): DataColumn[] {
    return this.dataColumnDefinition.getValue();
  }

  public setDatasource(datasource: Datasource<T>): void {
    this.datasource.next(datasource);
  }

  public getDatasource(): Datasource<T> {
    return this.datasource.getValue();
  }

  private mapColumnDefinitionToRowDefinition(
    columnDefinition: DataColumn[],
    datasource: Datasource<T>
  ): DataRow[] {
    const rows: DataRow[] = [];
    if (columnDefinition && datasource) {
      // console.log('INCOMING ARGS: %o %o', columnDefinition, datasource);
      // console.log('VALID ARGS');
      const valueKeys: string[] = columnDefinition.map(c => c.displayProperty);
      datasource.getData().forEach((row, index) => {
        rows.push({
          index: index,
          values: this.getRowValues(row, columnDefinition)
        });
      });
    }

    return rows;
  }

  private getRowValues(row: T, columnDefinition: DataColumn[]): Cell[] {
    const values: Cell[] = [];

    columnDefinition.forEach(column => {
      values.push({
        val: row[column.displayProperty],
        cellRenderer: column.cellRenderer ? column.cellRenderer : null,
        template: column.template ? column.template : null,
        cssClass: column.class ? column.class : null
      });
    });
    return values;
  }

  private getID(): string {
    return uuidv4();
  }
}
