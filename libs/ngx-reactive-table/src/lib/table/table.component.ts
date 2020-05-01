import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TableConfig } from './models/table-config';
import { DEFAULT_TABLE_CONFIG } from './config/table-config';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { TableBehavior } from './table-behavior';
import { TableStateService } from './services/table-state.service';
import { Datasource } from '../datasource/datasource';
import { DataRow } from './models/data-row.model';
import { TitleColumn } from './models/title-column.model';
import { DataColumn } from './models/data-column.model';
import { takeUntil, tap, map } from 'rxjs/operators';
import { HiddenColumns } from './models/hidden-column.model';
import { getRowStyle } from './config/row-style-maps';
import { calcAdjustedWidths } from '../shared/util/calculate-normalized-widths';
import { parseUnit } from '../shared/util/parse-unit';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableStateService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnInit, TableBehavior, OnDestroy {
  @Input() title: string = '';

  @Input() set tableConfig(arg: TableConfig) {
    this._tableConfig = arg;
    this.initalizeStyles(arg);
  }

  @Input() set headerDefinition(headerDefinition: TitleColumn[]) {
    if (headerDefinition) {
      this.stateService.setHeaderDefinition(headerDefinition);
    }
  }

  @Input() set dataColumnDefinition(arg: DataColumn[]) {
    if (arg) {
      this.stateService.setDataColumnDefinition(arg);
    }
  }

  @Input() set datasource(datasource: Datasource<T>) {
    if (datasource) {
      this.stateService.setDatasource(datasource);
    }
  }

  @Input() set showHiddenColumn(column: TitleColumn) {
    if (column) {
      this.showHiddenColumnAction$.next(column);
    }
  }

  @Output() hiddenColumns = new EventEmitter<HiddenColumns>();

  @HostBinding('style.width')
  tableWidth: string = DEFAULT_TABLE_CONFIG.width;

  private destroy$ = new Subject();
  private _tableConfig: TableConfig = null;

  private showHiddenColumnAction$ = new Subject<TitleColumn>();

  public renderHeaders$: Observable<TitleColumn[]>;
  public renderRows$: Observable<DataRow[]>;
  public renderColumnCount$: Observable<number>;

  public renderRowsLoading$: Observable<boolean>;

  public hiddenColumns$: Observable<TitleColumn[]>;
  public hiddenColumnsCount$: Observable<number>;

  public hiddenColumnsInfo$: Observable<HiddenColumns>;

  public columnWidth: string;

  private displayColumnWidths$$ = new Subject();
  public displayColumnWidths$: Observable<string>;

  constructor(public stateService: TableStateService<T>) {}

  ngOnInit() {
    this.displayColumnWidths$ = this.stateService.renderHeaders$.pipe(
      map(header => this.getColumnWidths(header))
    );

    this.renderHeaders$ = this.stateService.renderHeaders$;
    this.renderRows$ = this.stateService.renderRows$;
    this.renderColumnCount$ = this.stateService.renderColumnCount$;
    this.hiddenColumns$ = this.stateService.hiddenColumns$;
    this.hiddenColumnsCount$ = this.stateService.hiddenColumnsCount$;
    this.renderRowsLoading$ = this.stateService.renderRowsLoading$;
    this.showHiddenColumnAction$
      .pipe(
        takeUntil(this.destroy$),
        map(column => this.stateService.showHiddenColumn(column))
      )
      .subscribe();

    this.hiddenColumnsInfo$ = this.stateService.hiddenColumnsInfo$;
    this.hiddenColumnsInfo$
      .pipe(
        takeUntil(this.destroy$),
        map(i => this.hiddenColumns.emit(i))
      )
      .subscribe();
    this.columnWidth = this.initializeColumnWidth(this._tableConfig);

    // this.renderHeaders$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(header =>
    //     this.displayColumnWidths$$.next(this.getColumnWidths(header))
    //   );
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get tableConfig(): TableConfig {
    return this._tableConfig;
  }

  public onRowSelect(row: DataRow, rowIndex: number) {
    this.stateService.onRowSelect(row, rowIndex);
  }

  public getSelectedRows(): Observable<DataRow[]> {
    return this.stateService.selectedRows$;
  }

  public getSelectedRowsCount(): Observable<number> {
    return this.stateService.selectedRowsCount$;
  }

  public onColumnShow(column: TitleColumn): void {
    this.stateService.showHiddenColumn(column);
  }

  public onColumnHide(column: TitleColumn): void {
    this.stateService.hideColumn(column);
  }

  private initalizeStyles(config: TableConfig) {
    this.tableWidth = this.getTableWidth(config);
  }

  private getTableWidth(config: TableConfig): string {
    if (config && config.width) {
      return config.width;
    } else {
      return DEFAULT_TABLE_CONFIG.width;
    }
  }

  private initializeColumnWidth(config: TableConfig): string {
    if (config && config.defaultColumnWidth) {
    } else {
      return DEFAULT_TABLE_CONFIG.defaultColumnWidth;
    }
  }

  getColumnWidths(displayColumns: TitleColumn[]): string {
    let columnWidths: string[];
    let widthUnit: string;
    let normalizedWidths: string[];
    if (displayColumns) {
      columnWidths = displayColumns.map(v => {
        if (v.width) {
          return v.width;
        } else {
          return DEFAULT_TABLE_CONFIG.defaultColumnWidth;
        }
      });
      // TODO rethink this. It will not be really safe with not %-values.
      const widths: number[] = displayColumns.map(v => {
        if (v.width) {
          widthUnit = parseUnit(v.width);
          return parseInt(v.width.split(widthUnit)[0]);
        }
      });

      const sum = widths.reduce((a, b) => a + b, 0);
      if (sum > 100) {
        console.warn('The specified column widths exceed 100%');
      }
      /**
       * Calculate normalized widths when widts are given with '%'
       * to still reach 100 %.
       */
      normalizedWidths = calcAdjustedWidths(widths);
    }

    return normalizedWidths.join(' ');
  }
}
