import { Component, OnInit, Input } from '@angular/core';
import { TitleColumn } from '../../../models/table-models';
import { ReplaySubject, Observable } from 'rxjs';

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
  @Input() set hiddenColumns(columns: TitleColumn[]) {
    if (columns) {
      this.hiddenColumns$$.next(columns);
    }
  }
  constructor() {}

  ngOnInit() {}
}
