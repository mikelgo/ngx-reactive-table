import { Component, OnInit, Input, HostBinding } from '@angular/core';
import {
  RowDefinition,
  DataRow,
  TitleColumn,
  DataColumn
} from './models/table-models';
import { TableConfig } from './models/table-config';
import { DEFAULT_TABLE_CONFIG } from './config/table-config';
import { RowSelectEvent } from './models/row-select-event';
import { Subject, Observable } from 'rxjs';
import { switchMap, scan, startWith } from 'rxjs/operators';
import { TableBehavior } from './table-behavior';
import { TableStateService } from './services/table-state.service';
import { Datasource } from '../datasource/datasource';

@Component({
  selector: 'ngx-table-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableStateService]
})
export class TableComponent<T> implements OnInit, TableBehavior {
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

  @HostBinding('style.width')
  tableWidth: string = DEFAULT_TABLE_CONFIG.width;

  private _tableConfig: TableConfig = null;
  public renderHeaderDefinitions$: Observable<TitleColumn[]>;
  public renderDataColumnDefinitions$: Observable<DataColumn[]>;
  public rows$: Observable<DataRow[]>;

  constructor(public stateService: TableStateService<T>) {}

  ngOnInit() {
    this.renderHeaderDefinitions$ = this.stateService.renderHeaderDefinitions$;
    this.rows$ = this.stateService.rows$;
    this.renderHeaderDefinitions$.subscribe(console.log);
    this.rows$.subscribe(console.log);
  }

  get tableConfig(): TableConfig {
    return this._tableConfig;
  }

  public onRowSelect(row: RowDefinition, rowIndex: number) {
    this.stateService.onRowSelect(row, rowIndex);
  }

  public getSelectedRows(): Observable<RowDefinition[]> {
    return this.stateService.selectedRows$;
  }

  public getSelectedRowsCount(): Observable<number> {
    return this.stateService.selectedRowsCount$;
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
