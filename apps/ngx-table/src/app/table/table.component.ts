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
  HeaderColumns,
  DataRow
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
  // TODO will be removed
  @Input() rows: RowDefinition[] = [];

  @Input() title: string = '';

  @Input() set tableConfig(arg: TableConfig) {
    this._tableConfig = arg;
    this.initalizeStyles(arg);
  }

  @Input() set headerDefinition(headerDefinition: HeaderColumns) {
    if (headerDefinition) {
      this.stateService.setHeaderDefinition(headerDefinition);
    }
  }

  // TODO  map internally to RowDefinition[]
  @Input() set dataColumnDefinition(arg: ColumnDefinition) {
    if (arg) {
      this.stateService.setDataColumnDefinition(arg);
    }
  }

  // TODO implement datasource
  @Input() set datasource(datasource: Datasource<T>) {
    if (datasource) {
      this.stateService.setDatasource(datasource);
    }
  }

  @HostBinding('style.width')
  tableWidth: string = DEFAULT_TABLE_CONFIG.width;

  private _tableConfig: TableConfig = null;
  public rows$: Observable<DataRow[]>;

  constructor(public stateService: TableStateService<T>) {}

  ngOnInit() {
    this.rows$ = this.stateService.rows$;
  }

  get tableConfig(): TableConfig {
    return this._tableConfig;
  }

  get headerDefinition(): HeaderColumns {
    return this.stateService.getHeaderDefinition();
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
