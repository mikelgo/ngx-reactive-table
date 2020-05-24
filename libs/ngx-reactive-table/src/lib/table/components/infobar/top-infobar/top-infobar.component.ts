import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';
import { TitleColumn } from '../../../models/title-column.model';

@Component({
  selector: 'ngx-table-top-infobar',
  templateUrl: './top-infobar.component.html',
  styleUrls: ['./top-infobar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopInfobarComponent implements OnInit {
  private hiddenColumns$$ = new ReplaySubject<TitleColumn[]>(1);

  public hiddenColumns$: Observable<TitleColumn[]> = this.hiddenColumns$$.asObservable();

  @Input() set hiddenColumns(columns: TitleColumn[]) {
    if (columns) {
      this.hiddenColumns$$.next(columns);
    }
  }

  @Output() showHiddenColumn = new EventEmitter<TitleColumn>();

  constructor() {}

  ngOnInit() {}

  public onColumnShow(column: TitleColumn) {
    let col = { ...column, hide: false };
    this.showHiddenColumn.emit(col);
  }
}
