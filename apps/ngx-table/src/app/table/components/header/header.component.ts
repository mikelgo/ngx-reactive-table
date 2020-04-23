import { Component, OnInit, Input } from '@angular/core';
import { TitleColumn } from '../../models/table-models';

@Component({
  selector: 'ngx-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _displayColumns: TitleColumn[] = [];
  @Input() set displayColumns(displayColumns: TitleColumn[]) {
    this._displayColumns = displayColumns;
  }

  get displayColumns() {
    return this._displayColumns;
  }
  constructor() {}

  ngOnInit() {}
}
