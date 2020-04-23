import {
  Component,
  OnInit,
  Input,
  HostBinding,
  EventEmitter,
  Output
} from '@angular/core';
import { Column, RowDefinition, ColumnDefinition } from './models/table-models';
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
  @Input() title: string = '';
  @Input() displayColumns: ColumnDefinition = null;
  @Input() rows: RowDefinition[] = [];
  @Input() set tableConfig(arg: TableConfig) {
    this._tableConfig = arg;
    this.initalizeStyles(arg);
  }

  // TODO impl
  @Input() headerDefinition: HeaderComponent = null;
  // TODO  map internally to RowDefinition[]
  @Input() dataColumnDefinition: ColumnDefinition = null;

  // TODO implement datasource
  @Input() datasource: Datasource<T>;

  @HostBinding('style.width')
  tableWidth: string = DEFAULT_TABLE_CONFIG.width;

  private _tableConfig: TableConfig = null;

  constructor(public stateService: TableStateService) {}

  ngOnInit() {}

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
