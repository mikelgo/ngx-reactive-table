import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import { TitleColumn } from '../../../models/title-column.model';

@Component({
  selector: 'ngx-table-header-element',
  templateUrl: './header-element.component.html',
  styleUrls: ['./header-element.component.scss']
})
export class HeaderElementComponent implements OnInit {
  @Input() header = null;
  @Output() hideColumn = new EventEmitter<TitleColumn>();
  constructor() {}

  ngOnInit() {}

  onColumnHide(column: TitleColumn) {
    const col = { ...column, hide: true };
    this.hideColumn.emit(col);
  }
}
