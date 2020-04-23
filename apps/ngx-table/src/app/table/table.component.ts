import {
  Component,
  OnInit,
  Input,
  HostBinding,
  EventEmitter,
  Output
} from '@angular/core';
import {
  Column,
  RowDefinition,
  ColumnDefinition,
  HeaderColumns
} from './models/table-models';
import { TableConfig } from './models/table-config';
import { DEFAULT_TABLE_CONFIG } from './config/table-config';
import { RowSelectEvent } from './models/row-select-event';
import { Subject, Observable } from 'rxjs';
import { switchMap, scan, startWith } from 'rxjs/operators';
import { TableBehavior } from './table-behavior';
import { TableStateService } from './services/table-state.service';
import { Datasource } from '../datasource/datasource';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'ngx-table-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableStateService]
})
export class TableComponent<T> implements OnInit, TableBehavior {
  private _headerDefinition: HeaderColumns = null;
  private _dataColumnDefinition: ColumnDefinition = null;
  private _datasource: Datasource<T> = null;

  // TODO will be removed
  @Input() rows: RowDefinition[] = [];

  @Input() title: string = '';

  @Input() set tableConfig(arg: TableConfig) {
    this._tableConfig = arg;
    this.initalizeStyles(arg);
  }

  @Input() set headerDefinition(headerDefinition: HeaderColumns) {
    if (headerDefinition) {
      this._headerDefinition = headerDefinition;
    }
  }

  // TODO  map internally to RowDefinition[]
  @Input() set dataColumnDefinition(arg: ColumnDefinition) {
    if (arg) {
      console.log(arg);
      this._dataColumnDefinition = arg;
    }
  }

  // TODO implement datasource
  @Input() set datasource(datasource: Datasource<T>) {
    if (datasource) {
      console.log(datasource);
      this._datasource = datasource;
    }
  }

  @HostBinding('style.width')
  tableWidth: string = DEFAULT_TABLE_CONFIG.width;

  private _tableConfig: TableConfig = null;

  constructor(public stateService: TableStateService) {}

  ngOnInit() {}

  get tableConfig(): TableConfig {
    return this._tableConfig;
  }

  get headerDefinition(): HeaderColumns {
    return this._headerDefinition;
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

  // TODO implement
  // TODO move to service
  private mapColumnDefinitionToRowDefinition(
    columnDefinition: ColumnDefinition,
    datasource: Datasource<T>
  ): RowDefinition[] {
    return null;
  }
}
