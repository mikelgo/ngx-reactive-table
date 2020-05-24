import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Selectable } from './selectable';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { DataRow } from '../../models/data-row.model';
import { RowConfig } from '../../models/row-config';
import { getRowStyle } from '../../config/row-style-maps';
import { DEFAULT_ROW_CONFIG } from '../../config/table-config';

@Component({
  selector: 'ngx-table-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent implements OnInit, OnDestroy, Selectable {
  private _config: RowConfig = DEFAULT_ROW_CONFIG;
  private _isOdd: boolean = false;
  private isSelected: boolean = false;
  private _row: DataRow = null;

  private destroy$ = new Subject();
  @Input() set row(row: DataRow) {
    if (row) {
      this._row = row;
    }
  }

  @Input() set config(config: RowConfig) {
    if (config) {
      this._config = config;
      this.initalizeStyles(config, this._isOdd);
    }
  }

  @Input() set odd(isOdd: boolean) {
    this._isOdd = isOdd;
  }
  @Input() set columnWidths(arg) {
    this.columns = arg;
  }

  @HostBinding('style.border-top')
  borderTop: string = this.initBorderTopStyle(this._config, this._isOdd);
  @HostBinding('style.border-bottom')
  borderBottom: string = this.initBorderBottomStyle(this._config, this._isOdd);
  @HostBinding('style.background-color')
  backgroundColor: string = this.initBackgroundStyle(this._config, this._isOdd);
  @HostBinding('style.grid-gap.px') gap = 4;
  @HostBinding('style.grid-template-columns')
  columns = '';
  @HostBinding('style.min-height') height: string = this.initRowHeight(this._config);

  @HostListener('mouseenter')
  onHoverEnter() {
    if (!this.isSelected) {
      this.borderTop = '1px solid black';
      this.borderBottom = '1px solid black';
    }
  }

  @HostListener('mouseleave') onHoverLeave() {
    if (!this.isSelected && !this._isOdd) {
      this.borderTop = '1px solid transparent';
      this.borderBottom = '1px solid #ccc';
      this.backgroundColor = 'white';
    }
    if (!this.isSelected && this._isOdd) {
      this.borderTop = '1px solid transparent';
      this.borderBottom = '1px solid #ccc';
    }
  }

  @HostListener('click') onSelect() {
    this.isSelected = !this.isSelected;
    this.setClickStyle(this.isSelected);
  }

  get row(): DataRow {
    return this._row;
  }

  get odd(): boolean {
    return this._isOdd;
  }

  get config(): RowConfig {
    return this._config;
  }

  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setClickStyle(selected: boolean) {
    if (selected) {
      this.borderTop = '1px solid #4a5568';
      this.borderBottom = '1px solid #4a5568';
      this.backgroundColor = '#e2e8f0';
    } else {
      this.borderTop = DEFAULT_ROW_CONFIG.borderTopStyle;
      this.borderBottom = DEFAULT_ROW_CONFIG.borderBottomStyle;
      this.backgroundColor = DEFAULT_ROW_CONFIG.backgroundColor;
    }
  }

  private initalizeStyles(config: RowConfig, isOdd: boolean) {
    this.height = this.initRowHeight(config);
    this.borderTop = this.initBorderTopStyle(config, isOdd);
    this.borderBottom = this.initBorderBottomStyle(config, isOdd);
    this.backgroundColor = this.initBackgroundStyle(config, isOdd);
  }

  private initRowHeight(config: RowConfig): string {
    if (config && config.height) {
      return config.height;
    }

    if (config && config.style) {
      return getRowStyle(config.style);
    } else {
      return getRowStyle('wide');
    }
  }

  private initBorderTopStyle(config: RowConfig, isOdd: boolean): string {
    if (isOdd && config.striped && config.stripedStyleConfig) {
      return config.stripedStyleConfig.topBorderStyle;
    }
    return DEFAULT_ROW_CONFIG.borderTopStyle;
  }

  private initBorderBottomStyle(config: RowConfig, isOdd: boolean): string {
    if (isOdd && config.striped && config.stripedStyleConfig) {
      return config.stripedStyleConfig.bottomBorderStyle;
    }
    return DEFAULT_ROW_CONFIG.borderBottomStyle;
  }

  private initBackgroundStyle(config: RowConfig, isOdd: boolean): string {
    if (isOdd && config.striped && config.stripedStyleConfig) {
      return config.stripedStyleConfig.backgroundColor;
    }
    if (isOdd && config.striped && !config.stripedStyleConfig) {
      return '#eee';
    }

    return DEFAULT_ROW_CONFIG.backgroundColor;
  }
}
