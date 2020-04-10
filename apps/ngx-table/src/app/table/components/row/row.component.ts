import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener
} from '@angular/core';
import { RowDefinition } from '../../models/table-models';

@Component({
  selector: 'ngx-table-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  // TODO when selected then some highlighting
  // TODO Highlighting on Hover
  @Input() row: RowDefinition = null;

  @HostBinding('style.border-top') borderTop: string = '1px solid transparent';
  @HostBinding('style.border-bottom') borderBottom: string = '1px solid #ccc';
  @HostBinding('style.background-color') backgroundColor: string = 'white';

  @HostListener('mouseenter') mouseOver() {
    this.borderTop = '1px solid #4a5568';
    this.borderBottom = '1px solid #4a5568';
    this.backgroundColor = '#e2e8f0';
  }

  @HostListener('mouseleave') mouseLeave() {
    this.borderTop = '1px solid transparent';
    this.borderBottom = '1px solid #ccc';
    this.backgroundColor = 'white';
  }
  constructor() {}

  ngOnInit() {}
}
