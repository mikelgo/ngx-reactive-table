import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  OnDestroy
} from '@angular/core';
import { RowConfig } from '../../../models/row-config';
import { DEFAULT_ROW_CONFIG } from '../../../config/table-config';
import { DataRow } from '../../../models/data-row.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { getRowStyle } from '../../../config/row-style-maps';
import { Ghost } from '../models/ghost.model';

// TODO refactoring: create base row component to extended by this component and the row-component
@Component({
  selector: 'ngx-table-loading-row',
  templateUrl: './loading-row.component.html',
  styleUrls: ['./loading-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingRowComponent implements OnInit, OnDestroy {
  private _config: RowConfig = DEFAULT_ROW_CONFIG;
  private _isOdd: boolean = false;
  private _row: Ghost = null;
  private _renderColumnCount = new BehaviorSubject<number>(0);
  private columnsRenderer$: Observable<string>;
  private destroy$ = new Subject();
  @Input() set ghost(ghost: Ghost) {
    if (ghost) {
      this._row = ghost;
    }
  }

  @Input() set config(config: RowConfig) {
    if (config) {
      this._config = config;
      this.initalizeStyles(config, this._isOdd);
    }
  }
  @Input() set renderColumnCount(count: number) {
    if (count) {
      this._renderColumnCount.next(count);
    }
  }
  @Input() set odd(isOdd: boolean) {
    this._isOdd = isOdd;
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
  @HostBinding('style.min-height') height: string = this.initRowHeight(
    this._config
  );
  get row(): Ghost {
    return this._row;
  }
  constructor() {}

  ngOnInit() {
    this.columnsRenderer$ = this._renderColumnCount.asObservable().pipe(
      takeUntil(this.destroy$),
      map(count => this.getTemplateColumns(count))
    );

    this.columnsRenderer$.subscribe(v => (this.columns = v));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getTemplateColumns(count: number): string {
    return `repeat(${count}, 1fr)`;
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
    return '1px solid transparent';
  }

  private initBorderBottomStyle(config: RowConfig, isOdd: boolean): string {
    if (isOdd && config.striped && config.stripedStyleConfig) {
      return config.stripedStyleConfig.bottomBorderStyle;
    }
    return '1px solid #ccc';
  }

  private initBackgroundStyle(config: RowConfig, isOdd: boolean): string {
    if (isOdd && config.striped && config.stripedStyleConfig) {
      return config.stripedStyleConfig.backgroundColor;
    }
    if (isOdd) {
      return '#eee';
    }

    return 'white';
  }
}
