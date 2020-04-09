import { Component, OnInit, Input } from '@angular/core';
import { RowDefinition } from '../../models/table-models';

@Component({
  selector: 'ngx-table-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input() row: RowDefinition = null;
  constructor() {}

  ngOnInit() {}
}
