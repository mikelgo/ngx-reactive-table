import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { TableConfig } from '../../models/table-config';
import { DEFAULT_TABLE_CONFIG } from '../../config/table-config';

@Component({
  selector: 'ngx-table-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements OnInit {
  @Input() set config(arg: TableConfig) {
    if (arg) {
      this.initalizeStyles(arg);
    }
  }

  @HostBinding('style.max-height')
  private _maxBodyheight: string = DEFAULT_TABLE_CONFIG.maxBodyHeight;
  constructor() {}

  ngOnInit() {}
  private initalizeStyles(config: TableConfig) {
    this._maxBodyheight = this.setMaxBodyHeight(config);
  }

  public get maxBodyHeight() {
    return this._maxBodyheight;
  }

  private setMaxBodyHeight(config: TableConfig): string {
    if (config && config.maxBodyHeight) {
      return config.maxBodyHeight;
    } else {
      return DEFAULT_TABLE_CONFIG.maxBodyHeight;
    }
  }
}
