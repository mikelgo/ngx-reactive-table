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

@Component({
  selector: 'ngx-table-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input() row: RowDefinition = null;

  @HostBinding('style.border-top') borderTop: string = '1px solid transparent';
  @HostBinding('style.border-bottom') borderBottom: string = '1px solid #ccc';
  @HostBinding('style.background-color') backgroundColor: string = 'white';

  @HostListener('mouseenter') mouseOver() {
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
  @HostListener('click') onClick() {
    this.isSelected = !this.isSelected;
    this.setClickStyle(this.isSelected);
  }

  constructor() {}

  ngOnInit() {}

  private setClickStyle(selected: boolean) {
    console.log(selected);
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
}
