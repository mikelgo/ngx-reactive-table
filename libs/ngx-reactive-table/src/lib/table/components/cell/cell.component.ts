import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../../models/cell.model';

@Component({
  selector: 'ngx-table-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  private _cell: Cell = null;
  @Input() set cell(cell: Cell) {
    if (cell) {
      this._cell = cell;
    }
  }

  get cell() {
    return this._cell;
  }
  constructor() {}

  ngOnInit() {}
}
