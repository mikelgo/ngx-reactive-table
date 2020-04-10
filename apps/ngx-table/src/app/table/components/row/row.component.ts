import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';
import { RowDefinition } from '../../models/table-models';
import { Selectable } from './selectable';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'ngx-table-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, Selectable<RowComponent> {
  @Input() row: RowDefinition = null;

  @HostBinding('style.border-top') borderTop: string = '1px solid transparent';
  @HostBinding('style.border-bottom') borderBottom: string = '1px solid #ccc';
  @HostBinding('style.background-color') backgroundColor: string = 'white';

  @HostListener('mouseenter') onHover(selectable: RowComponent) {
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
  private isSelected: boolean = false;
  private selected$$ = new BehaviorSubject<Selectable<RowComponent>>(null);

  @HostListener('click') onSelect(selectable: RowComponent) {
    this.isSelected = !this.isSelected;
    this.setClickStyle(this.isSelected);
    this.setSelected(this.isSelected);
  }

  constructor() {}

  ngOnInit() {}
  getSelected(): Observable<Selectable<RowComponent>> {
    if (this.isSelected) {
      return this.selected$$.asObservable();
    }
  }

  getHovered(): Selectable<RowComponent> {
    throw new Error('Method not implemented.');
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
  private setSelected(selected: boolean): void {
    if (selected) {
      this.selected$$.next(this);
    } else {
      this.selected$$.next(null);
    }
  }
}
