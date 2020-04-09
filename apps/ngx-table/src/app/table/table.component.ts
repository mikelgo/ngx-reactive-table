import { Component, OnInit, Input } from '@angular/core';
import { ColumnDefinition, RowDefinition } from './models/table-models';

@Component({
  selector: 'ngx-table-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() title: string = '';
  @Input() displayColumns: ColumnDefinition[] = [];
  @Input() rows: RowDefinition[] = [];

  constructor() {}

  ngOnInit() {}
}
