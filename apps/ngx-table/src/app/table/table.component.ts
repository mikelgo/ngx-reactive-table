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

@Component({
  selector: 'ngx-table-table',
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

  public hiddenColumns$: Observable<TitleColumn[]>;
  public hiddenColumnsCount$: Observable<number>;

  public hiddenColumnsInfo$: Observable<HiddenColumns>;

  constructor(public stateService: TableStateService<T>) {}

  ngOnInit() {
    this.renderHeaders$ = this.stateService.renderHeaders$;
    this.renderRows$ = this.stateService.renderRows$;
    this.renderColumnCount$ = this.stateService.renderColumnCount$;
    this.hiddenColumns$ = this.stateService.hiddenColumns$;
    this.hiddenColumnsCount$ = this.stateService.hiddenColumnsCount$;

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
}
