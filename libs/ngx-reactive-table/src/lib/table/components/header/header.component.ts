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
import { DEFAULT_HEADER_CONFIG } from '../../config/table-config';
import { TitlePositions } from '../../models/title-positions';
import { TitlePositionMaps } from '../../config/title-position-maps';

@Component({
  selector: 'ngx-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private _config: HeaderConfig = null;
  private _displayColumns: TitleColumn[] = [];
  private _columnWidhts: string = null;
  private _horizontalElementAlignment: string = this.initHorizontalElementAlignment(this._config);
  private _verticalElementAlignment: string = this.initVerticalElementAlignment(this._config);

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
  @Input() set columnWidths(arg: string) {
    if (arg) {
      this._columnWidhts = arg;
    }
  }

  @Output() hideColumn = new EventEmitter<TitleColumn>();

  @HostBinding('style.height') headerHeight: string = DEFAULT_HEADER_CONFIG.titleRowHeight;

  gap = 0;

  get displayColumns() {
    return this._displayColumns;
  }

  get config() {
    return this._config;
  }

  get columnWidths() {
    return this._columnWidhts;
  }

  constructor() {}

  ngOnInit() {}

  public onColumnHide(column: TitleColumn) {
    let col = { ...column, hide: true };
    this.hideColumn.emit(col);
  }

  private initalizeStyles(config: HeaderConfig) {
    this.headerHeight = this.getHeaderHeight(config);
    this._verticalElementAlignment = this.initVerticalElementAlignment(config);
    this._horizontalElementAlignment = this.initHorizontalElementAlignment(config);
  }

  private getHeaderHeight(config: HeaderConfig) {
    if (config && config.titleRowHeight) {
      return config.titleRowHeight;
    } else {
      return DEFAULT_HEADER_CONFIG.titleRowHeight;
    }
  }
  private initHorizontalElementAlignment(config: HeaderConfig): string {
    // TODO think about how to do this in an easier/cleaner way
    if (config && config.titlePositioning) {
      const positionMap: Map<TitlePositions, string[]> = TitlePositionMaps.getPositionMap(
        config.titlePositioning
      );

      const position: string[] = positionMap.get(config.titlePositioning);
      return position[0];
    } else {
      const pos: string[] = TitlePositionMaps.CENTER_CENTER.get(TitlePositions.CENTER_CENTER);
      return pos[0];
    }
  }
  private initVerticalElementAlignment(config: HeaderConfig): string {
    if (config && config.titlePositioning) {
      const positionMap: Map<TitlePositions, string[]> = TitlePositionMaps.getPositionMap(
        config.titlePositioning
      );

      const position: string[] = positionMap.get(config.titlePositioning);
      return position[1];
    } else {
      const pos: string[] = TitlePositionMaps.CENTER_CENTER.get(TitlePositions.CENTER_CENTER);
      return pos[1];
    }
  }

  // justify-self
  get horizontalElementAlignment() {
    return this._horizontalElementAlignment;
  }

  get verticalElementAlignment() {
    return this._verticalElementAlignment;
  }
}
