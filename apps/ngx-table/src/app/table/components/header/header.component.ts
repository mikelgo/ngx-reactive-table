import {
  Component,
  OnInit,
  Input,
  HostBinding,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { TitleColumn } from '../../models/title-column.model';
import { HeaderConfig } from '../../models/header-config';
import {
  DEFAULT_HEADER_CONFIG,
  DEFAULT_TABLE_CONFIG
} from '../../config/table-config';
import { TitlePositions } from '../../models/title-positions';
import { TitlePositionMaps } from '../../config/title-position-maps';
import { parseUnit } from '../../../shared/util/parse-unit';
import { calcAdjustedWidths } from '../../../shared/util/calculate-normalized-widths';
@Component({
  selector: 'ngx-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private _config: HeaderConfig;
  private _displayColumns: TitleColumn[] = [];
  private _horizontalElementAlignment: string = this.initHorizontalElementAlignment(
    this._config
  );
  private _verticalElementAlignment: string = this.initVerticalElementAlignment(
    this._config
  );

  @Input() set config(config: HeaderConfig) {
    if (config) {
      this._config = config;
      this.initalizeStyles(config);
    }
  }

  @Input() set displayColumns(displayColumns: TitleColumn[]) {
    this._displayColumns = displayColumns;
  }
  @Input() columnCount: number = 0;

  @Output() hideColumn = new EventEmitter<TitleColumn>();

  @HostBinding('style.height') headerHeight: string =
    DEFAULT_HEADER_CONFIG.titleRowHeight;

  gap = 4;

  get displayColumns() {
    return this._displayColumns;
  }

  get config() {
    return this._config;
  }

  getTemplateColumns(): string {
    let columnWidths: string[];
    let widthUnit: string;
    let normalizedWidths: string[];
    if (this._displayColumns) {
      columnWidths = this._displayColumns.map(v => {
        if (v.width) {
          return v.width;
        } else {
          return DEFAULT_TABLE_CONFIG.defaultColumnWidth;
        }
      });
      // TODO rethink this. It will not be really safe.
      const widths: number[] = this._displayColumns.map(v => {
        if (v.width) {
          widthUnit = parseUnit(v.width);
          return parseInt(v.width.split(widthUnit)[0]);
        }
      });

      const sum = widths.reduce((a, b) => a + b, 0);
      if (sum > 100) {
        console.warn('The specified column widths exceed 100%');
      }
      /**
       * Calculate normalized widths when widts are given with '%'
       * to still reach 100 %.
       */
      normalizedWidths = calcAdjustedWidths(widths);
    }

    return normalizedWidths.join(' ');
  }

  constructor() {}

  ngOnInit() {}

  onColumnHide(column: TitleColumn) {
    let col = { ...column, hide: true };
    this.hideColumn.emit(col);
  }

  private initalizeStyles(config: HeaderConfig) {
    this.headerHeight = this.getHeaderHeight(config);
    this._verticalElementAlignment = this.initVerticalElementAlignment(config);
    this._horizontalElementAlignment = this.initHorizontalElementAlignment(
      config
    );
  }

  private getHeaderHeight(config: HeaderConfig) {
    if (config && config.titleRowHeight) {
      return config.titleRowHeight;
    } else {
      return DEFAULT_HEADER_CONFIG.titleRowHeight;
    }
  }
  private initHorizontalElementAlignment(config: HeaderConfig): string {
    if (config && config.titlePositioning) {
      const positionMap: Map<
        TitlePositions,
        string[]
      > = TitlePositionMaps.getPositionMap(config.titlePositioning);

      const position: string[] = positionMap.get(config.titlePositioning);
      return position[0];
    } else {
      const pos: string[] = TitlePositionMaps.CENTER_CENTER.get(
        TitlePositions.CENTER_CENTER
      );
      return pos[0];
    }
  }
  private initVerticalElementAlignment(config: HeaderConfig): string {
    if (config && config.titlePositioning) {
      const positionMap: Map<
        TitlePositions,
        string[]
      > = TitlePositionMaps.getPositionMap(config.titlePositioning);

      const position: string[] = positionMap.get(config.titlePositioning);
      return position[1];
    } else {
      const pos: string[] = TitlePositionMaps.CENTER_CENTER.get(
        TitlePositions.CENTER_CENTER
      );
      return pos[1];
    }
  }

  private getColumnWidth() {}

  // justify-self
  get horizontalElementAlignment() {
    return this._horizontalElementAlignment;
  }

  get verticalElementAlignment() {
    return this._verticalElementAlignment;
  }
}
