import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TableConfig } from '../../models/table-config';
import { DEFAULT_TABLE_CONFIG } from '../../config/table-config';

@Component({
  selector: 'ngx-table-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() set maxBodyHeight(arg: TableConfig) {
    this.initalizeStyles(arg);
  }

  @HostBinding('style.max-height')
  _maxBodyheight: string = DEFAULT_TABLE_CONFIG.maxBodyHeight;
  constructor() {}

  ngOnInit() {}
  private initalizeStyles(config: TableConfig) {
    this._maxBodyheight = this.getMaxBodyHeight(config);
  }

  public getMaxBodyHeight(config: TableConfig): string {
    if (config && config.maxBodyHeight) {
      return config.maxBodyHeight;
    } else {
      return DEFAULT_TABLE_CONFIG.maxBodyHeight;
    }
  }
}
