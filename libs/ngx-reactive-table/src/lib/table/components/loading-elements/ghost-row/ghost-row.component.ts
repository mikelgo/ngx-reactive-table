import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';
import { RowConfig } from '../../../models/row-config';
import { DEFAULT_ROW_CONFIG } from '../../../config/table-config';
import { getRowStyle } from '../../../config/row-style-maps';

@Component({
  selector: 'ngx-table-ghost-row',
  templateUrl: './ghost-row.component.html',
  styleUrls: ['./ghost-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GhostRowComponent implements OnInit {
  private _config: RowConfig = DEFAULT_ROW_CONFIG;
  @Input() set config(config: RowConfig) {
    if (config) {
      this._config = config;
      this.initalizeStyles(config);
    }
  }

  @HostBinding('style.height') height: string = this.initRowHeight(
    this._config
  );

  get config() {
    return this._config;
  }

  private initalizeStyles(config: RowConfig) {
    this.height = this.initRowHeight(config);
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
  constructor() {}

  ngOnInit() {}
}
