import {
  Component,
  OnInit,
  Input,
  HostBinding,
  EventEmitter
} from '@angular/core';
import { Column, RowDefinition, ColumnDefinition } from './models/table-models';
import { TableConfig } from './models/table-config';
import { DEFAULT_TABLE_CONFIG } from './config/table-config';
import { RowSelectEvent } from './models/row-select-event';
import { Subject } from 'rxjs';
import { switchMap, scan, startWith } from 'rxjs/operators';
@Component({
  selector: 'ngx-table-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() title: string = '';
  @Input() displayColumns: ColumnDefinition = null;
  @Input() rows: RowDefinition[] = [];
  @Input() set tableConfig(arg: TableConfig) {
    this._tableConfig = arg;
    this.initalizeStyles(arg);
  }
  @HostBinding('style.width')
  tableWidth: string = DEFAULT_TABLE_CONFIG.width;

  private _tableConfig: TableConfig = null;
  private onRowSelect$$ = new Subject<RowSelectEvent>();

  constructor() {}

  ngOnInit() {}

  get tableConfig(): TableConfig {
    return this._tableConfig;
  }

  public onRowClick(row: RowDefinition, rowIndex: number) {
    console.log('row %o, index %o', row, rowIndex);
    this.onRowSelect$$.next({ rowIndex: rowIndex, row: row });
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
