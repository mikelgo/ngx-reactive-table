import { Component, OnInit, Input } from '@angular/core';
import { ColumnDefinition } from '../../models/table-models';

@Component({
  selector: 'ngx-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() displayColumns: ColumnDefinition[] = [];
  constructor() {}

  ngOnInit() {}
}
