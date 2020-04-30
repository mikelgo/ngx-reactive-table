import {
  Component,
  OnInit,
  HostBinding,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { TableConfig } from '../../../models/table-config';
import { DEFAULT_TABLE_CONFIG } from '../../../config/table-config';
import { getRowStyle } from '../../../config/row-style-maps';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-table-loading-body',
  templateUrl: './loading-body.component.html',
  styleUrls: ['./loading-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBodyComponent implements OnInit {
  private _tableConfig;
  private _count = 0;
  private columnCount$$ = new Subject<number>();
  private columnCount$ = this.columnCount$$.asObservable();
  @Input() set config(config: TableConfig) {
    if (config) {
      this._tableConfig = config;
      this.initalizeStyles(config);
    }
  }
  @Input() set columnCount(count: number) {
    if (count) {
      this.columnCount$$.next(count);
      this._count = count;
    }
  }
  @HostBinding('style.height') height = this.initHeight(this._tableConfig);
  public ghostElements: any[] = this.initGhostRows(
    this.getLoadingRowsCount(this._tableConfig)
  );

  get config() {
    return this._tableConfig;
  }

  gap = 4;
  getTemplateColumns(): string {
    return `repeat(${this._count}, 1fr)`;
  }
  constructor() {}

  ngOnInit() {
    this.columnCount$.subscribe(console.log);
  }

  private initalizeStyles(config: TableConfig) {
    this.height = this.initHeight(config);
  }

  private initHeight(config: TableConfig): string {
    if (config && config.maxBodyHeight) {
      return config.maxBodyHeight;
    } else {
      return DEFAULT_TABLE_CONFIG.maxBodyHeight;
    }
  }

  public getLoadingRowsCount(config: TableConfig): number {
    let bodyHeight = 0;
    let rowHeight = 0;
    // get body height
    if (config && config.maxBodyHeight) {
      bodyHeight = parseInt(config.maxBodyHeight.split('px')[0]);
    } else {
      bodyHeight = parseInt(DEFAULT_TABLE_CONFIG.maxBodyHeight.split('px')[0]);
    }
    // get row height
    if (config && config.rowConfig && config.rowConfig.style) {
      const rowstyle = config.rowConfig.style;
      rowHeight = parseInt(getRowStyle(rowstyle).split('px')[0]);
    } else {
      rowHeight = parseInt(
        getRowStyle(DEFAULT_TABLE_CONFIG.rowConfig.style).split('px')[0]
      );
    }
    let rowCount = Math.round(bodyHeight / rowHeight);
    if (rowCount === 0) {
      rowCount = 1;
    }

    return rowCount;
  }

  private initGhostRows(count: number): any[] {
    const ghostRows = [];
    for (let i = 0; i <= count; i++) {
      ghostRows.push({
        id: i,
        values: Array(4).fill(0) // TODO hardcoded value --> column count
      });
    }
    return ghostRows;
  }
}
