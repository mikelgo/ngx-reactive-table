import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../../models/table-models';

@Component({
  selector: 'ngx-table-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() cell: Cell = null;
  constructor() {}

  ngOnInit() {}
}
