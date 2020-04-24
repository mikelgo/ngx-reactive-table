import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2,
  OnDestroy
} from '@angular/core';

import { Selectable } from './selectable';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DataRow } from '../../models/data-row.model';

@Component({
  selector: 'ngx-table-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent
  implements OnInit, OnDestroy, Selectable<RowComponent> {
  private isSelected: boolean = false;
  private _row: DataRow = null;
  private _renderColumnCount = new BehaviorSubject<number>(0);
  private columnsRenderer$: Observable<string>;
  private destroy$ = new Subject();
  @Input() set row(row: DataRow) {
    if (row) {
      this._row = row;
    }
  }
  @Input() set renderColumnCount(count: number) {
    if (count) {
      this._renderColumnCount.next(count);
    }
  }

  @HostBinding('style.border-top')
  borderTop: string = '1px solid transparent';
  @HostBinding('style.border-bottom') borderBottom: string = '1px solid #ccc';
  @HostBinding('style.background-color') backgroundColor: string = 'white';
  @HostBinding('style.grid-gap.px') gap = 4;
  @HostBinding('style.grid-template-columns')
  columns = '';

  @HostListener('mouseenter')
  onHover(selectable: RowComponent) {
    if (!this.isSelected) {
      this.borderTop = '1px solid #4a5568';
      this.borderBottom = '1px solid #4a5568';
      this.backgroundColor = '#e2e8f0';
    }
  }

  @HostListener('mouseleave') mouseLeave() {
    if (!this.isSelected) {
      this.borderTop = '1px solid transparent';
      this.borderBottom = '1px solid #ccc';
      this.backgroundColor = 'white';
    }
  }

  @HostListener('click') onSelect(selectable: RowComponent) {
    this.isSelected = !this.isSelected;
    this.setClickStyle(this.isSelected);
  }

  get row(): DataRow {
    return this._row;
  }

  constructor() {}

  ngOnInit() {
    this.columnsRenderer$ = this._renderColumnCount.asObservable().pipe(
      takeUntil(this.destroy$),
      map(count => this.getTemplateColumns(count))
    );

    this.columnsRenderer$.subscribe(v => (this.columns = v));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setClickStyle(selected: boolean) {
    if (selected) {
      this.borderTop = '1px solid #4a5568';
      this.borderBottom = '1px solid #4a5568';
      this.backgroundColor = '#e2e8f0';
    } else {
      this.borderTop = '1px solid transparent';
      this.borderBottom = '1px solid #ccc';
      this.backgroundColor = 'white';
    }
  }
  getTemplateColumns(count: number): string {
    return `repeat(${count}, 1fr)`;
  }
}
