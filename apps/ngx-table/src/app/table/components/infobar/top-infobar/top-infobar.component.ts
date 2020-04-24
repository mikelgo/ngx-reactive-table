import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';
import { TitleColumn } from '../../../models/title-column.model';

@Component({
  selector: 'ngx-table-top-infobar',
  templateUrl: './top-infobar.component.html',
  styleUrls: ['./top-infobar.component.scss']
})
export class TopInfobarComponent implements OnInit {
  private hiddenColumns$$ = new ReplaySubject<TitleColumn[]>(1);
  public hiddenColumns$: Observable<
    TitleColumn[]
  > = this.hiddenColumns$$.asObservable();
  private hiddenColumnsCount$$ = new ReplaySubject<number>(1);
  public hiddenColumnsCount$ = this.hiddenColumnsCount$$.asObservable();

  @Input() set hiddenColumns(columns: TitleColumn[]) {
    if (columns) {
      this.hiddenColumns$$.next(columns);
    }
  }

  @Input() set hiddenColumnsCount(count: number) {
    if (count) {
      this.hiddenColumnsCount$$.next(count);
    }
  }

  @Output() showHiddenColumn = new EventEmitter<TitleColumn>();

  constructor() {}

  ngOnInit() {}

  onColumnShow(column: TitleColumn) {
    let col = { ...column, hide: false };
    this.showHiddenColumn.emit(col);
  }
}
