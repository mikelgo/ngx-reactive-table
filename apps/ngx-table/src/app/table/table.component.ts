import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Column, RowDefinition, ColumnDefinition } from './models/table-models';
import { TableConfig } from './models/table-config';
import { DEFAULT_TABLE_CONFIG } from './config/table-config';

@Component({
  selector: 'ngx-table-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private _tableConfig: TableConfig = null;
  @Input() title: string = '';
  @Input() displayColumns: ColumnDefinition = null;
  @Input() rows: RowDefinition[] = [];
  @Input() set tableConfig(arg: TableConfig) {
    this._tableConfig = arg;
    this.initalizeStyles(arg);
  }
  @HostBinding('style.width')
  tableWidth: string = DEFAULT_TABLE_CONFIG.width;

  constructor() {}

  ngOnInit() {}

  get tableConfig(): TableConfig {
    return this._tableConfig;
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
