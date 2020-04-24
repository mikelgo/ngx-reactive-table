import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  Subject,
  merge
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
  filter,
  tap,
  takeUntil,
  distinctUntilChanged,
  scan,
  share,
  shareReplay
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
  > = this.headerDefinition.asObservable().pipe(
    filter(v => v !== null),
    distinctUntilChanged()
  );

  private visibleHeaderDefinitions$: Observable<TitleColumn[]>;

  private visibleDataColumnDefinitions$: Observable<
    DataColumn[]
  > = this.dataColumnDefinition.asObservable().pipe(
    filter(v => v !== null),
    distinctUntilChanged()
  );

  // private visibleDataColumnDefinitions$: Observable<DataColumn[]>;

  private datasource$: Observable<
    Datasource<T>
  > = this.datasource.asObservable().pipe(
    filter(v => v !== null),
    distinctUntilChanged()
  );

  private selectedRows: RowDefinition[] = [];
  private selectedRowsCache$$ = new BehaviorSubject<RowDefinition[]>(null);
  public selectedRows$ = this.selectedRowsCache$$.asObservable();
  public selectedRowsCount$: Observable<number> = this.selectedRows$.pipe(
    filter(values => values !== null),
    map(values => values.length)
  );

  private lastSelectedRowCache$$ = new BehaviorSubject<RowDefinition>(null);
  public lastSelectedRow$ = this.lastSelectedRowCache$$.asObservable();

  private initialization$: Observable<
    [Datasource<T>, TitleColumn[], DataColumn[]]
  >;
  private showColumnAction$ = new Subject<TitleColumn>();
  private hideColumnAction$ = new Subject<TitleColumn>();

  private columnVisibilityActions$ = merge(
    this.showColumnAction$,
    this.hideColumnAction$
  );
  // THOSE WILL BE USED IN TABLE
  public renderHeaders$: Observable<TitleColumn[]>;
  public renderRows$: Observable<DataRow[]>;
  public renderColumnCount$: Observable<number>;

  public hiddenColumns$: Observable<TitleColumn[]>;
  public hiddenColumnsCount$: Observable<number>;

  constructor() {
    this.visibleHeaderDefinitions$ = merge(
      this.headerDefinition$,
      this.columnVisibilityActions$
    ).pipe(
      scan((state: TitleColumn[], action: TitleColumn) => {
        const newState = [...state];
        newState.find(e => e.id === action.id).hide = action.hide;
        return [...newState];
      })
    );

    this.initialization$ = combineLatest([
      this.datasource$,
      this.visibleHeaderDefinitions$,
      this.visibleDataColumnDefinitions$
    ]);

    this.renderHeaders$ = this.initialization$.pipe(
      map(
        ([datasource, headerDefinition, dataColumnDefinition]) =>
          headerDefinition
      ),
      map(titleColumns => titleColumns.filter(c => !c.hide))
    );

    this.renderRows$ = this.initialization$.pipe(
      map(([datasource, headerDefinition, dataColumnDefinition]) =>
        this.mapColumnDefinitionToRowDefinition(
          headerDefinition,
          dataColumnDefinition,
          datasource
        )
      )
    );

    // TODO Check again if really correct like this
    this.renderColumnCount$ = this.renderHeaders$.pipe(map(v => v.length));

    this.hiddenColumns$ = this.initialization$.pipe(
      map(
        ([datasource, headerDefinition, dataColumnDefinition]) =>
          headerDefinition
      ),
      map(titleColumns => titleColumns.filter(c => c.hide))
    );
    this.hiddenColumnsCount$ = this.hiddenColumns$.pipe(
      filter(v => v !== null),
      map(v => v.length)
    );
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

  public showHiddenColumn(column: TitleColumn): void {
    this.showColumnAction$.next(column);
  }

  private mapColumnDefinitionToRowDefinition(
    headerDefinition: TitleColumn[],
    columnDefinition: DataColumn[],
    datasource: Datasource<T>
  ): DataRow[] {
    const rows: DataRow[] = [];
    if (columnDefinition && datasource && headerDefinition) {
      datasource.getData().forEach((row, index) => {
        rows.push({
          index: index,
          values: this.getRowValues(row, headerDefinition, columnDefinition)
        });
      });
    }
    return rows;
  }

  private getRowValues(
    row: T,
    headerDefinition: TitleColumn[],
    columnDefinition: DataColumn[]
  ): Cell[] {
    const values: Cell[] = [];
    columnDefinition.forEach((column, index) => {
      if (!headerDefinition[index].hide) {
        // if (!column.hide) {
        values.push({
          val: row[column.displayProperty],
          cellRenderer: column.cellRenderer ? column.cellRenderer : null,
          template: column.template ? column.template : null,
          cssClass: column.class ? column.class : null
        });
      }
    });
    return values;
  }

  private getID(): string {
    return uuidv4();
  }
}
